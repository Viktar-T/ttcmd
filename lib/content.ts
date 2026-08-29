import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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
 */
const mdxOptions = {
  parseFrontmatter: true,
  mdxOptions: { remarkPlugins: [remarkGfm] },
};

export interface ModuleSummary extends ModuleFrontmatter {
  slug: string;
}

export interface LessonSummary extends LessonFrontmatter {
  slug: string;
}

export interface Lesson extends LessonSummary {
  body: ReactElement;
}

async function readModuleSlugs(): Promise<string[]> {
  const entries = await readdir(contentRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

async function readModuleFrontmatter(
  moduleSlug: string
): Promise<ModuleFrontmatter> {
  const source = await readFile(
    path.join(contentRoot, moduleSlug, moduleIndexFile),
    "utf8"
  );
  const { frontmatter } = await compileMDX({
    source,
    options: mdxOptions,
  });
  return moduleFrontmatterSchema.parse(frontmatter);
}

export async function listModules(): Promise<ModuleSummary[]> {
  const slugs = await readModuleSlugs();
  return Promise.all(
    slugs.map(async (slug) => ({
      slug,
      ...(await readModuleFrontmatter(slug)),
    }))
  );
}

export async function getModule(
  moduleSlug: string
): Promise<ModuleSummary | null> {
  const slugs = await readModuleSlugs();
  if (!slugs.includes(moduleSlug)) return null;
  return { slug: moduleSlug, ...(await readModuleFrontmatter(moduleSlug)) };
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
  const source = await readFile(
    path.join(contentRoot, moduleSlug, `${lessonSlug}.mdx`),
    "utf8"
  );
  const { frontmatter, content } = await compileMDX({
    source,
    options: mdxOptions,
  });
  return { frontmatter: lessonFrontmatterSchema.parse(frontmatter), content };
}

export async function listLessons(
  moduleSlug: string
): Promise<LessonSummary[]> {
  const slugs = await readLessonSlugs(moduleSlug);
  const lessons = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter } = await readLessonFrontmatterAndBody(
        moduleSlug,
        slug
      );
      return { slug, ...frontmatter };
    })
  );
  return lessons.sort((a, b) => a.order - b.order);
}

export async function getLesson(
  moduleSlug: string,
  lessonSlug: string
): Promise<Lesson | null> {
  const slugs = await readLessonSlugs(moduleSlug);
  if (!slugs.includes(lessonSlug)) return null;
  const { frontmatter, content } = await readLessonFrontmatterAndBody(
    moduleSlug,
    lessonSlug
  );
  return { slug: lessonSlug, ...frontmatter, body: content };
}
