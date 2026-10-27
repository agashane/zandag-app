import Medusa from "@medusajs/js-sdk";
import { createClient, type InferClient } from "@mercurjs/client";
import type { Routes } from "@zandag-app/api/_generated";
import { env } from "~/env/server";

export const mercur: InferClient<Routes> = createClient({
  baseUrl: env.STORE_URL,
  fetchOptions: {
    headers: {
      "x-publishable-api-key": env.MEDUSA_PUBLISHABLE_KEY as string,
    },
  },
});

export const medusa = new Medusa({
  baseUrl: env.STORE_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: env.MEDUSA_PUBLISHABLE_KEY,
});
