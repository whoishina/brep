import { z } from "zod";

export const docSchema = z.object({
  name: z.string(),
  path: z.string(),
  fid: z.string(),
  status: z.string().optional(),
});

export type Doc = z.infer<typeof docSchema>;
