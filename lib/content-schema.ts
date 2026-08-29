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
  /**
   * Whether the lesson is part of the published course. Absent means true —
   * every lesson written before this field existed stays published, and only
   * a deliberate `publish: false` hides one. Strictly a boolean, no coercion:
   * the likeliest mistake is a quoted `"false"`, which would coerce to the
   * one wrong answer this field exists to prevent, so it fails the build
   * instead (slice 008).
   */
  publish: z.boolean().optional(),
});

export type ModuleFrontmatter = z.infer<typeof moduleFrontmatterSchema>;
export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;
