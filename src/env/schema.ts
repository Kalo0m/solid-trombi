import { z } from "zod";

export const serverScheme = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  ENABLE_VC_BUILD: z
    .string()
    .default("1")
    .transform((v) => parseInt(v)),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  FACEBOOK_CLIENT_SECRET: z.string(),
  FACEBOOK_CLIENT_ID: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_TRUST_HOST: z.string().optional(),
  NEXTAUTH_URL: z.string().optional(),
  DATABASE_URL: z.string(),
  EMAIL_SERVER: z.string(),
  EMAIL_FROM: z.string(),
});

export const clientScheme = z.object({
  MODE: z.enum(["development", "production", "test"]).default("development"),
});
