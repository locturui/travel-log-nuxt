import { z } from "zod";

export const QuerySchema = z.object({
  q: z.string().min(1, "Query must not be empty"),
});

export type QuerySchema = z.infer<typeof QuerySchema>;

export const NameSchema = z.string().min(1).max(100);
export const DescriptionSchema = z.string().max(1000).or(z.null());
export const LatSchema = z.coerce.number().min(-90).max(90);
export const LongSchema = z.coerce.number().min(-180).max(180);
