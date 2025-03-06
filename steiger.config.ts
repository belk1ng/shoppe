import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: [
      "./src/shared/styles/**",
      "./src/shared/typings/**",
      "./src/shared/assets/**",
    ],
    rules: {
      "fsd/public-api": "off",
    },
  },
]);
