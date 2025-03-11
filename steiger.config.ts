import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
  {
    files: ["./src/shared/**"],
    rules: {
      "fsd/segments-by-purpose": "off",
    },
  },
  {
    files: [
      "./src/shared/styles/**",
      "./src/shared/typings/**",
      "./src/shared/assets/**",
      "./src/shared/config/**",
    ],
    rules: {
      "fsd/public-api": "off",
    },
  },
]);
