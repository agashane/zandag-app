import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    DEFAULT_REGION_COOKIE: z.string(),
    DEFAULT_REGION_VALUE: z.string(),
    DEFAULT_CART_COOKIE: z.string(),
    REDIRECT_COOKIE: z.string(),
    AUTH_JWT_KEY: z.string(),
    WEBSITE_URL: z.string(),
    COOKIE_SECRET: z.string(),
  },
  runtimeEnv: process.env,
});
