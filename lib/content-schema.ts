import { z } from "zod";

export const moduleFrontmatterSchema = z.object({
  title: z.string().min(1),
});

export const lessonFrontmatterSchema = z.object({
  title: z.string().min(1),
  order: z.number(),
  summary: z.string().min(1),
  week: z.number().optional(),
});

export type ModuleFrontmatter = z.infer<typeof moduleFrontmatterSchema>;
export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;
