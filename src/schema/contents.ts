import { z } from 'zod';

export const contentListItemSchema = z.object({
  id: z.string(),
  img: z.string(),
  ranking: z.number(),
  title: z.string(),
  artist: z.string(),
});

export const contentResponseSchema = z.object({
  contents: z.array(contentListItemSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const contentListSchema = z.array(contentListItemSchema);
export type ContentsListResponse = z.infer<typeof contentResponseSchema>;
