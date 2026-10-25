import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "teal",
      fontFamily: "Public Sans Variable, sans-serif",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Public Sans Variable, sans-serif" },
        body: { value: "Public Sans Variable, sans-serif" },
      },
    },
    semanticTokens: {
      radii: {
        radius: { value: "radii.xl" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
