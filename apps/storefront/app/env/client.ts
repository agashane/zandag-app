import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  client: {
    VITE_STORE_URL: z.url(),
    VITE_MEDUSA_PUBLISHABLE_KEY: z.string(),
  },
  clientPrefix: "VITE_",
  runtimeEnv: import.meta.env,
});
