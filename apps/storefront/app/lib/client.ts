import Medusa from "@medusajs/js-sdk";
import { createClient, type InferClient } from "@mercurjs/client";
import type { Routes } from "@zandag-app/api/_generated";

const MEDUSA_BACKEND_URL = "http://localhost:9000";

export const mercur: InferClient<Routes> = createClient({
  baseUrl: MEDUSA_BACKEND_URL,
});

export const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.VITE_PUBLISHABLE_KEY,
});
