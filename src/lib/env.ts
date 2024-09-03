import { z } from "zod";

const envSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const env = envSchema.parse(process.env);
