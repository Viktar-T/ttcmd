import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache, type ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";
import { Exercise } from "@/components/exercise";
import { rehypeCodeHighlight } from "./code-highlight";
import { rehypeSectionAnchors, type SectionEntry } from "./section-anchors";
import {
  EXERCISE_ELEMENT,
  rehypeExercises,
  type ExerciseEntry,
  type ExercisePolicy,
} from "./exercises";
import { rehypeBlocks } from "./blocks";
import {
  rehypeLinks,
  resolveInternalLinks,
  SITE_ROUTES,
  type CollectedLink,
  type ContentProblem,
  type LinkTargets,
  type LinkUse,
} from "./links";
import { lessonId, lessonLetter, moduleLabel, moduleNumber } from "./numbering";
import {
  lessonFrontmatterSchema,
  moduleFrontmatterSchema,
  type LessonFrontmatter,
  type ModuleFrontmatter,
} from "./content-schema";

const contentRoot = path.join(process.cwd(), "content", "moduly");
const moduleIndexFile = "index.mdx";

/*
 * MDX implements CommonMark, and Markdown tables are not CommonMark — they are
 * a GitHub Flavored Markdown extension. Without this plugin the one table in
 * the lessons renders as a paragraph of pipe characters, which is how it had
 * been rendering on the live site. See ADR-0009 for what else GFM brings and
 * why none of it changes the content as written today.
 *
 * Both compileMDX calls below share these options: a module index is written
 * in the same Markdown as a lesson and must parse the same way.
 *
 * Slice 005 adds the code highlighter to the same object, for the same reason:
 * a fenced block in a module index is a fenced block, and a second place to
 * configure it is a second place for the two to drift apart. It runs here, at
 * build, inside a Server Component — nothing about it is shipped to a browser.
 *
 * Slice 007 turns the object into a function of one argument: the section
 * collector is per-compile state — a module-level array would interleave the
 * sections of every lesson compiled in the same pass — so the options are
 * built per call around a fresh array. Everything else is unchanged, and
 * still configured exactly once.
 *
 * Slice 009 adds the exercise plugin and a second per-compile collector, on
 * the same argument. It runs FIRST of the three, which correctness does not
 * depend on — the identifier it might collide with is reserved by shape rather
 * than by a list (lib/numbering.ts) — but a reader meets the reservation's
 * cause before its effect.
 *
 * Slice 010 adds two more plugins and two more collectors, on the same
 * argument again. Both share one `problems` array, because a build that stops
 * on a lesson should say everything wrong with that lesson rather than the
 * first thing; and both share one `links` array, because a link written inside
 * a source entry and a link written in a paragraph are the same kind of thing
 * and are resolved by the same pass (spec, criterion 15).
 */
function buildMdxOptions(
  collect: SectionEntry[],
  policy: ExercisePolicy,
  collectExercises: ExerciseEntry[],
  problems: ContentProblem[],
  links: CollectedLink[]
) {
  /* Typed as the tuples they are — the same shape code-highlight.ts exports —
     because inference widens a two-element array literal into a union array,
     which Pluggable rejects. */
  const exercises: [
    typeof rehypeExercises,
    { policy: ExercisePolicy; collect: ExerciseEntry[] },
  ] = [rehypeExercises, { policy, collect: collectExercises }];

  const sectionAnchors: [
    typeof rehypeSectionAnchors,
    { collect: SectionEntry[] },
  ] = [rehypeSectionAnchors, { collect }];

  const blocks: [
    typeof rehypeBlocks,
    { problems: ContentProblem[]; collect: CollectedLink[] },
  ] = [rehypeBlocks, { problems, collect: links }];

  const linkUses: [
    typeof rehypeLinks,
    { collect: CollectedLink[]; problems: ContentProblem[] },
  ] = [rehypeLinks, { collect: links, problems }];

  return {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        exercises,
        blocks,
        linkUses,
        sectionAnchors,
        rehypeCodeHighlight,
      ],
    },
  };
}

/*
 * The two elements a lesson does not get as plain HTML.
 *
 * A code block needs a wrapper the copy control can be pinned to while the code
 * scrolls underneath it, which means the scroller cannot be the outermost
 * element — so `pre` is mapped. An exercise has no HTML element to be, and it
 * carries a number the author did not write. Everything else in a lesson stays
 * a plain element with a plain stylesheet, as slices 003 and 004 left it.
 *
 * The map is a function of the policy for one reason: a body compiled for
 * COUNTING carries exercises with no number on them, and it is discarded
 * unrendered (see `listLessons`). Binding the real component there would make
 * a future refactor that starts rendering that body publish `Zadanie
 * undefined`; binding a stub that throws makes the same refactor stop the
 * build. It can never fire, and that is the point.
 */
function mdxComponents(policy: ExercisePolicy) {
  if (policy.mode === "number") {
    return { pre: CodeBlock, [EXERCISE_ELEMENT]: Exercise };
  }

  return {
    pre: CodeBlock,
    [EXERCISE_ELEMENT]: () => {
      throw new Error(
        `<${EXERCISE_ELEMENT}>: this body was compiled to count exercises, ` +
          `not to render them, and carries no numbers. Render the body ` +
          `getLesson() returns.`
      );
    },
  };
}

/**
 * The frontmatter block, as `vfile-matter` matches it.
 *
 * `next-mdx-remote` strips the frontmatter before compiling — **removing** the
 * block rather than blanking it — so every line number a plugin reads off the
 * tree is body-relative. Measured, not assumed: a paragraph on file line 6,
 * under a four-line frontmatter block, arrives in the rehype phase reported as
 * line 2.
 *
 * That is the kind of wrong that looks right. Every number would be off by the
 * same small amount, in every lesson, always in the same direction — and a
 * message pointing three lines above the mistake sends its reader looking at
 * the wrong paragraph. The offset is computed here, in the one function that
 * holds the raw source and already owns the message.
 *
 * The guard is the point of it: a file that opens with `---` and whose block
 * this pattern cannot match would silently produce numbers off by five, so it
 * stops the build instead of guessing.
 */
const FRONTMATTER =
  /^---(?:\r?\n|\r)(?:[\s\S]*?(?:\r?\n|\r))?---(?:\r?\n|\r|$)/;

function frontmatterLineOffset(source: string, relativePath: string): number {
  const match = FRONTMATTER.exec(source);
  if (match) return (match[0].match(/\r\n|\r|\n/g) ?? []).length;

  if (source.startsWith("---")) {
    throw new Error(
      `${relativePath}: this file opens with "---" but its frontmatter block ` +
        `could not be matched, so every line number this build reports for it ` +
        `would be wrong by the height of that block. Close the block with a ` +
        `line of exactly "---".`
    );
  }
  return 0;
}

/**
 * Every compile goes through here so that a failure names the file.
 *
 * The things slice 005 made into build failures — an unrecognised language, an
 * info line that does not parse, a marked line past the end of a block — are
 * thrown from inside the highlighter, which knows the block but not the lesson.
 * A build that stops on "cannot read the info line" without saying which of
 * eight files it is in is a build somebody has to bisect.
 *
 * Slice 010 adds the line, and it arrives by a different route for a reason
 * worth knowing before anything else is wired here. `next-mdx-remote` catches
 * whatever is thrown inside a compile and **rebuilds it as a fresh plain Error
 * carrying only the message text** — a custom class, a `line` property and a
 * `cause` all disappear. So the two new plugins do not throw: they push onto
 * `problems`, and this function raises them once `compileMDX` has resolved,
 * outside the `catch` that would otherwise prefix the path twice. One place
 * composes `path:line:`, the plugins know neither half, and every refusal in a
 * file is reported in one run instead of one per build.
 */
async function compile(
  source: string,
  relativePath: string,
  policy: ExercisePolicy
) {
  const sections: SectionEntry[] = [];
  const exercises: ExerciseEntry[] = [];
  const problems: ContentProblem[] = [];
  const collected: CollectedLink[] = [];

  let compiled;
  try {
    compiled = await compileMDX({
      source,
      options: buildMdxOptions(sections, policy, exercises, problems, collected),
      components: mdxComponents(policy),
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${relativePath}: ${detail}`, { cause: error });
  }

  const offset = frontmatterLineOffset(source, relativePath);

  if (problems.length > 0) {
    throw new Error(
      problems
        .map((problem) => `${relativePath}:${problem.line + offset}: ${problem.message}`)
        .join("\n\n")
    );
  }

  /* Completed here and nowhere else, for the same reason the refusals are:
     this is the one function holding both the path and the offset. Everything
     downstream carries a location it does not have to compute. */
  const links: LinkUse[] = collected.map((link) => ({
    ...link,
    path: relativePath,
    line: link.line + offset,
  }));

  return {
    frontmatter: compiled.frontmatter,
    content: compiled.content,
    sections,
    exercises,
    links,
  };
}

/**
 * Where an exercise may not be written, and why — the message an author reads.
 *
 * A module's introduction is not a lesson: it has no `order`, so it is not on
 * the walk that produces the numbers, and an exercise written there could only
 * render as a blank or a zero on a public page (spec §6, Article VIII).
 */
const EXERCISES_FORBIDDEN: ExercisePolicy = {
  mode: "forbidden",
  reason:
    "an exercise belongs to a lesson. A module's introduction is not on the " +
    "walk that numbers exercises across the module (ADR-0003), so there is " +
    "no number this one could be given. Move it into a lesson.",
};

/**
 * Compiles a Markdown string through the pipeline a lesson gets — the same
 * remark plugins, the same highlighter, the same components map.
 *
 * It exists for the reference page. Slice 005's spec says in as many words that
 * nine one-line `bash` blocks do not cover this slice: none declares a
 * filename, none marks a line, none is long enough to scroll, and none is C# —
 * which Article VII makes the language that must work. The specimens have to go
 * through the real path or they prove nothing, and this is that path.
 *
 * Slice 009 adds the policy, and it defaults to `forbidden` rather than to
 * counting: a caller that renders a specimen without saying which module it
 * belongs to gets a build failure, not a page with no number on it.
 */
export async function compileProse(
  source: string,
  label: string,
  policy: ExercisePolicy = EXERCISES_FORBIDDEN
): Promise<ReactElement> {
  /* Slice 010: the one compile outside the course walk, so it resolves its own
     internal links — against the same targets, through the same function, as
     every lesson. That is deliberate rather than thorough: a specimen whose
     links were exempt from the check would demonstrate a parallel derivation
     instead of the one the site runs, which is the alternative the spec's
     decision 19 rejects. It also means the reference page's internal link has
     to point at a lesson that really exists. */
  const { targets } = await readCourse();
  const { content, links } = await compile(source, label, policy);
  resolveInternalLinks(links, targets);
  return content;
}

export interface ModuleSummary extends ModuleFrontmatter {
  slug: string;
}

export interface LessonSummary extends LessonFrontmatter {
  slug: string;
  /** The lesson's top-level sections, in document order — the id in the
      article's DOM and the id the contents panel links to, one derivation
      (lib/section-anchors.ts). */
  sections: SectionEntry[];
  /** How many exercises this lesson contains, counted from the same parsed
      tree that renders them. It is what the module's walk adds up; the lesson
      itself has no use for it. */
  exerciseCount: number;
}

export interface Lesson extends LessonSummary {
  body: ReactElement;
}

/**
 * A lesson as the navigation knows it: its frontmatter, plus everything that is
 * derived rather than written down — the letter, the identity string a teacher
 * says out loud, and the URL.
 */
export interface CourseLesson extends LessonSummary {
  moduleSlug: string;
  letter: string;
  id: string;
  href: string;
  /** How many exercises the module's earlier published lessons hold — so this
      lesson's first exercise is `<module>.<exerciseOffset + 1>`. Produced by
      the walk in `getCourse` and by nothing else: it is the whole of ADR-0003's
      "an exercise cannot know its own number from inside its own file". */
  exerciseOffset: number;
}

export interface CourseModule extends ModuleSummary {
  number: number;
  label: string;
  href: string;
  body: ReactElement;
  lessons: CourseLesson[];
}

async function readModuleSlugs(): Promise<string[]> {
  const entries = await readdir(contentRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/**
 * The index file's frontmatter **and** its body.
 *
 * The body was compiled and thrown away until slice 006. Both module index
 * files carry a written introduction to their module, and nothing had ever
 * rendered one.
 */
async function readModule(moduleSlug: string): Promise<{
  frontmatter: ModuleFrontmatter;
  content: ReactElement;
  links: LinkUse[];
}> {
  const relativePath = `content/moduly/${moduleSlug}/${moduleIndexFile}`;
  const source = await readFile(
    path.join(contentRoot, moduleSlug, moduleIndexFile),
    "utf8"
  );
  const { frontmatter, content, links } = await compile(
    source,
    relativePath,
    EXERCISES_FORBIDDEN
  );
  return {
    frontmatter: moduleFrontmatterSchema.parse(frontmatter),
    content,
    links,
  };
}

async function readLessonSlugs(moduleSlug: string): Promise<string[]> {
  const entries = await readdir(path.join(contentRoot, moduleSlug), {
    withFileTypes: true,
  });
  return entries
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".mdx") &&
        entry.name !== moduleIndexFile
    )
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

/**
 * `policy` is the caller's, and the two callers want different things from the
 * same file: `listLessons` counts, `getLesson` numbers. That is the double
 * compile ADR-0003 forces — the offsets cannot exist until every earlier lesson
 * of the module has been counted, and a compiled body's props are fixed at the
 * moment it is compiled.
 */
async function readLessonFrontmatterAndBody(
  moduleSlug: string,
  lessonSlug: string,
  policy: ExercisePolicy
) {
  const relativePath = `content/moduly/${moduleSlug}/${lessonSlug}.mdx`;
  const source = await readFile(
    path.join(contentRoot, moduleSlug, `${lessonSlug}.mdx`),
    "utf8"
  );
  const { frontmatter, content, sections, exercises, links } = await compile(
    source,
    relativePath,
    policy
  );
  /* The schema failure joins the convention `compile` establishes above: a
     build that stops on a frontmatter mistake must say which file, not print
     a bare issue list somebody has to bisect across every lesson on disk. */
  let parsed: LessonFrontmatter;
  try {
    parsed = lessonFrontmatterSchema.parse(frontmatter);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${relativePath}: ${detail}`, { cause: error });
  }
  return { frontmatter: parsed, content, sections, exercises, links };
}

/**
 * The counting pass.
 *
 * Every `.mdx` in the module is read, schema-parsed and compiled here — the
 * same pass that has always produced the frontmatter and the section anchors
 * now also produces each lesson's exercise count, from the same parsed tree
 * that will render them. A regular expression over the raw source would be a
 * second derivation of one fact, and it would disagree with the first the day
 * a lesson teaches this element inside a fenced code block.
 *
 * The compiled bodies are dropped, exactly as they were before: this function
 * returns frontmatter, sections and the count. They carry no numbers, because
 * no offset exists yet — see the stub in `mdxComponents`.
 */
async function listLessons(moduleSlug: string): Promise<{
  lessons: LessonSummary[];
  links: LinkUse[];
  /** The hrefs of lesson files that exist and are not published — kept so a
      link to one can be refused in its own words rather than as "there is no
      such page" (spec, criterion 14). Derived here because this is where the
      publish flag is read; nothing else re-reads the directory to find them. */
  unpublished: string[];
}> {
  const slugs = await readLessonSlugs(moduleSlug);
  const read = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter, sections, exercises, links } =
        await readLessonFrontmatterAndBody(moduleSlug, slug, { mode: "count" });
      return {
        lesson: {
          slug,
          ...frontmatter,
          sections,
          exerciseCount: exercises.length,
        },
        links,
      };
    })
  );

  /* Taken BEFORE the filter below, and that is the whole of it: a draft's
     links are checked like everyone else's. Taking them from the filtered
     array would leave every unpublished lesson's links unread until the
     morning its flag is flipped — the same failure the filter's own position
     exists to prevent, arriving through a different door. */
  const links = read.flatMap((entry) => entry.links);
  const unpublished = read
    .filter((entry) => entry.lesson.publish === false)
    .map((entry) => `/moduly/${moduleSlug}/${entry.lesson.slug}`);

  /* The filter runs after every file on disk has been read, schema-parsed
     and compiled — the position is load-bearing. Filtering at the slug stage
     would park an unpublished draft outside the build gate, and the gate is
     the reason drafts live in this repo at all: a draft that breaks fails
     the build today, not on the morning its flag is flipped. Everything
     derived downstream — lists, counts, pagers, emitted routes — sees only
     published lessons; letters cannot shift because they come from `order`,
     never from a position in this filtered array (ADR-0003). */
  const lessons = read
    .map((entry) => entry.lesson)
    .filter((lesson) => lesson.publish !== false)
    .sort((a, b) => a.order - b.order);

  return { lessons, links, unpublished };
}

/**
 * The whole course, with everything derived that a page might need to render a
 * link to any part of it.
 *
 * One function, because a breadcrumb, a lesson list, a previous/next control
 * and a module card are four views of the same three facts — which modules
 * exist, in what order, and which lessons are in each. Deriving them four times
 * is how one page comes to disagree with another about what a lesson is called,
 * which is the concern lib/numbering.ts already opens with.
 *
 * Wrapped in React's `cache()`, so it is built once per render pass rather than
 * once per component that asks. Deliberately NOT a module-level Map: that would
 * survive a content edit under `next dev` and keep serving the old course until
 * the process was restarted.
 *
 * Modules are sorted by the number their prefix carries, not by folder name as
 * text — the directory sort is correct only while every prefix is two digits,
 * and puts module 10 before module 2 the day one is not.
 *
 * Slice 010 splits the exported `getCourse` from the cached walk beneath it,
 * because the walk now produces a second thing: the set of pages a link may
 * point at. Every page still asks for the course and gets exactly what it got
 * before; `compileProse` is the one caller that wants the other half, and it
 * is the only compile outside this walk.
 */
const readCourse = cache(
  async (): Promise<{ modules: CourseModule[]; targets: LinkTargets }> => {
    const slugs = await readModuleSlugs();

    const walked = await Promise.all(
      slugs.map(async (slug) => {
      const number = moduleNumber(slug);
      const { frontmatter, content, links: moduleLinks } = await readModule(slug);

      /* THE EXERCISE WALK — ADR-0003, and the one thing in this slice that is
         easy to get wrong.

         It runs HERE and nowhere else, because `listLessons` has just returned
         the module's lessons already filtered to the published ones and already
         sorted by `order`, and this is the only point in the repository where
         all three facts an offset needs exist at once: which lessons a student
         can open, what sequence they run in, and how many exercises each holds.

         The running total starts at zero for every module, so a module whose
         earlier letters do not exist still starts at 1 — module 0's only
         lesson has `order: 3` and its first exercise is 0.1. An unpublished
         lesson is gone before the accumulation begins, so it consumes no
         numbers. Insert an exercise anywhere and every later offset moves, with
         no lesson file touched.

         Accumulating before the filter and the sort would count drafts and
         count in directory order: right today, wrong the first time a lesson is
         withdrawn or renamed. Numbering from a lesson's index in this array
         would be the mistake lib/numbering.ts already opens by warning about,
         with a different index. */
      const listed = await listLessons(slug);

      let exercisesSoFar = 0;
      const lessons = listed.lessons.map((lesson) => {
        const exerciseOffset = exercisesSoFar;
        exercisesSoFar += lesson.exerciseCount;
        return {
          ...lesson,
          moduleSlug: slug,
          letter: lessonLetter(lesson.order),
          id: lessonId(number, lesson.order),
          href: `/moduly/${slug}/${lesson.slug}`,
          exerciseOffset,
        };
      });

      return {
        module: {
          slug,
          ...frontmatter,
          number,
          label: moduleLabel(number),
          href: `/moduly/${slug}`,
          body: content,
          lessons,
        },
        links: [...moduleLinks, ...listed.links],
        unpublished: listed.unpublished,
      };
      })
    );

    const modules = walked
      .map((entry) => entry.module)
      .sort((a, b) => a.number - b.number);

    /* THE LINK RESOLUTION — and its position is the whole of it.

       A link into the course is valid exactly when the course contains the
       page it names, so the set of valid targets IS the model just built:
       `href` is already computed above for the navigation, and `lessons` is
       already filtered to the published ones and sorted. Deriving the targets
       any other way — a second walk of the content directory, a scan in a
       build script — would mean re-implementing the publish rule, the module
       prefix rule and the slug rule, and disagreeing with the first
       implementation the day any of the three changed.

       It cannot happen any earlier. This function runs the compiles that
       collect the links, so at the moment a lesson is compiled the model does
       not exist; and this function is wrapped in `cache()`, so a plugin asking
       it for the answer would re-enter a promise waiting on the very compile
       that asked. Collect during, resolve after. */
    const published = new Set<string>(SITE_ROUTES);
    const moduleHrefs = new Set<string>();
    for (const item of modules) {
      published.add(item.href);
      moduleHrefs.add(item.href);
      for (const lesson of item.lessons) published.add(lesson.href);
    }
    const targets: LinkTargets = {
      published,
      unpublished: new Set(walked.flatMap((entry) => entry.unpublished)),
      modules: moduleHrefs,
    };

    resolveInternalLinks(
      walked.flatMap((entry) => entry.links),
      targets
    );

    return { modules, targets };
  }
);

export async function getCourse(): Promise<CourseModule[]> {
  return (await readCourse()).modules;
}

export interface LessonPosition {
  module: CourseModule;
  lesson: CourseLesson;
}

/**
 * The lesson before and the lesson after, **across module boundaries**.
 *
 * The course is flattened into one sequence first, so crossing from the last
 * lesson of one module into the first of the next needs no special case — which
 * is the whole point: a module edge is a dead end only if the code makes one.
 */
export async function getLessonNeighbours(
  moduleSlug: string,
  lessonSlug: string
): Promise<{ previous: LessonPosition | null; next: LessonPosition | null }> {
  const course = await getCourse();
  const sequence: LessonPosition[] = course.flatMap((module) =>
    module.lessons.map((lesson) => ({ module, lesson }))
  );

  const index = sequence.findIndex(
    (entry) =>
      entry.module.slug === moduleSlug && entry.lesson.slug === lessonSlug
  );
  if (index === -1) return { previous: null, next: null };

  return {
    previous: sequence[index - 1] ?? null,
    next: sequence[index + 1] ?? null,
  };
}

export async function getModuleNeighbours(
  moduleSlug: string
): Promise<{ previous: CourseModule | null; next: CourseModule | null }> {
  const course = await getCourse();
  const index = course.findIndex((module) => module.slug === moduleSlug);
  if (index === -1) return { previous: null, next: null };
  return { previous: course[index - 1] ?? null, next: course[index + 1] ?? null };
}

/**
 * The rendering pass: the one lesson a page is about, with its exercises
 * numbered.
 *
 * IT RESOLVES THE LESSON THROUGH THE COURSE, and the `await` on the first line
 * is what makes the numbering correct rather than a convention somebody has to
 * remember. A body cannot be compiled with an offset until the offset exists,
 * and the offset does not exist until every earlier published lesson of the
 * module has been counted — so the dependency is expressed as data. There is no
 * ordering here for a future edit to break.
 *
 * Slice 008's refusal is preserved and its argument has moved one function
 * along. The **gate** is still `listLessons`, which reads, schema-parses and
 * compiles every file on disk before the publish filter runs, so a broken draft
 * still fails the build today rather than on the morning its flag is flipped.
 * The **refusal** is still data-level and still happens per request: an
 * unpublished lesson is absent from the course model, so the lookup below
 * misses and the page answers with the site's not-found response — the same
 * `null` as a slug that never existed, identically under `next dev` and in
 * production, which is what matters on a host that renders routes absent from
 * the build output on first request.
 */
export async function getLesson(
  moduleSlug: string,
  lessonSlug: string
): Promise<Lesson | null> {
  const course = await getCourse();
  const moduleItem = course.find((item) => item.slug === moduleSlug);
  const entry = moduleItem?.lessons.find((item) => item.slug === lessonSlug);
  if (!moduleItem || !entry) return null;

  const { frontmatter, content, sections, exercises } =
    await readLessonFrontmatterAndBody(moduleSlug, lessonSlug, {
      mode: "number",
      moduleNumber: moduleItem.number,
      offset: entry.exerciseOffset,
    });

  return {
    slug: lessonSlug,
    ...frontmatter,
    sections,
    exerciseCount: exercises.length,
    body: content,
  };
}
