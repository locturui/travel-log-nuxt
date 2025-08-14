import { z } from "zod";

export const QuerySchema = z.object({
  q: z.string().min(1, "Query must not be empty"),
});

export type QuerySchema = z.infer<typeof QuerySchema>;
