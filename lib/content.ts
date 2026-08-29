import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache, type ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";
import { rehypeCodeHighlight } from "./code-highlight";
import { rehypeSectionAnchors, type SectionEntry } from "./section-anchors";
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
 */
function buildMdxOptions(collect: SectionEntry[]) {
  /* Typed as the tuple it is — the same shape code-highlight.ts exports —
     because inference widens a two-element array literal into a union array,
     which Pluggable rejects. */
  const sectionAnchors: [
    typeof rehypeSectionAnchors,
    { collect: SectionEntry[] },
  ] = [rehypeSectionAnchors, { collect }];

  return {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [sectionAnchors, rehypeCodeHighlight],
    },
  };
}

/*
 * The one element a lesson does not get as plain HTML. A code block needs a
 * wrapper the copy control can be pinned to while the code scrolls underneath
 * it, which means the scroller cannot be the outermost element — so `pre` is
 * mapped, and everything else in a lesson stays a plain element with a plain
 * stylesheet, as slices 003 and 004 left it.
 */
const mdxComponents = { pre: CodeBlock };

/**
 * Every compile goes through here so that a failure names the file.
 *
 * The things slice 005 made into build failures — an unrecognised language, an
 * info line that does not parse, a marked line past the end of a block — are
 * thrown from inside the highlighter, which knows the block but not the lesson.
 * A build that stops on "cannot read the info line" without saying which of
 * eight files it is in is a build somebody has to bisect.
 */
async function compile(source: string, relativePath: string) {
  const sections: SectionEntry[] = [];
  try {
    const { frontmatter, content } = await compileMDX({
      source,
      options: buildMdxOptions(sections),
      components: mdxComponents,
    });
    return { frontmatter, content, sections };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${relativePath}: ${detail}`, { cause: error });
  }
}

/**
 * Compiles a Markdown string through the pipeline a lesson gets — the same
 * remark plugins, the same highlighter, the same components map.
 *
 * It exists for the reference page. Slice 005's spec says in as many words that
 * nine one-line `bash` blocks do not cover this slice: none declares a
 * filename, none marks a line, none is long enough to scroll, and none is C# —
 * which Article VII makes the language that must work. The specimens have to go
 * through the real path or they prove nothing, and this is that path.
 */
export async function compileProse(
  source: string,
  label: string
): Promise<ReactElement> {
  const { content } = await compile(source, label);
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
async function readModule(
  moduleSlug: string
): Promise<{ frontmatter: ModuleFrontmatter; content: ReactElement }> {
  const relativePath = `content/moduly/${moduleSlug}/${moduleIndexFile}`;
  const source = await readFile(
    path.join(contentRoot, moduleSlug, moduleIndexFile),
    "utf8"
  );
  const { frontmatter, content } = await compile(source, relativePath);
  return { frontmatter: moduleFrontmatterSchema.parse(frontmatter), content };
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

async function readLessonFrontmatterAndBody(
  moduleSlug: string,
  lessonSlug: string
) {
  const relativePath = `content/moduly/${moduleSlug}/${lessonSlug}.mdx`;
  const source = await readFile(
    path.join(contentRoot, moduleSlug, `${lessonSlug}.mdx`),
    "utf8"
  );
  const { frontmatter, content, sections } = await compile(
    source,
    relativePath
  );
  return {
    frontmatter: lessonFrontmatterSchema.parse(frontmatter),
    content,
    sections,
  };
}

async function listLessons(moduleSlug: string): Promise<LessonSummary[]> {
  const slugs = await readLessonSlugs(moduleSlug);
  const lessons = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter, sections } = await readLessonFrontmatterAndBody(
        moduleSlug,
        slug
      );
      return { slug, ...frontmatter, sections };
    })
  );
  return lessons.sort((a, b) => a.order - b.order);
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
 */
export const getCourse = cache(async (): Promise<CourseModule[]> => {
  const slugs = await readModuleSlugs();

  const modules = await Promise.all(
    slugs.map(async (slug) => {
      const number = moduleNumber(slug);
      const { frontmatter, content } = await readModule(slug);
      const lessons = (await listLessons(slug)).map((lesson) => ({
        ...lesson,
        moduleSlug: slug,
        letter: lessonLetter(lesson.order),
        id: lessonId(number, lesson.order),
        href: `/moduly/${slug}/${lesson.slug}`,
      }));

      return {
        slug,
        ...frontmatter,
        number,
        label: moduleLabel(number),
        href: `/moduly/${slug}`,
        body: content,
        lessons,
      };
    })
  );

  return modules.sort((a, b) => a.number - b.number);
});

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

export async function getLesson(
  moduleSlug: string,
  lessonSlug: string
): Promise<Lesson | null> {
  const slugs = await readLessonSlugs(moduleSlug);
  if (!slugs.includes(lessonSlug)) return null;
  const { frontmatter, content, sections } = await readLessonFrontmatterAndBody(
    moduleSlug,
    lessonSlug
  );
  return { slug: lessonSlug, ...frontmatter, sections, body: content };
}
