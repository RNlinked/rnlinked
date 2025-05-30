import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3000),
});

export type Env = z.infer<typeof envSchema>;

export default envSchema.parse(process.env);
