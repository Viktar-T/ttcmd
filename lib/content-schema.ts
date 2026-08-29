import { z } from "zod";

export const moduleFrontmatterSchema = z.object({
  title: z.string().min(1),
});

export const lessonFrontmatterSchema = z.object({
  title: z.string().min(1),
  /**
   * The lesson's position within its module, and the source of its letter
   * (ADR-0003, `lib/numbering.ts`). Bounded here rather than guarded there:
   * the schema is the single source of truth for lesson metadata (Article
   * VIII), so a lesson with `order: 0` or `order: 1.5` fails the build with a
   * message about the frontmatter instead of rendering a bracket where a
   * letter belongs. 26 is where the letters run out.
   */
  order: z.number().int().min(1).max(26),
  summary: z.string().min(1),
  week: z.number().optional(),
});

export type ModuleFrontmatter = z.infer<typeof moduleFrontmatterSchema>;
export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;
