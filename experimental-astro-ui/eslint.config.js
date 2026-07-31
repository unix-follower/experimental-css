import prettier from "eslint-config-prettier"
import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import ts from "typescript-eslint"
import eslintPluginAstro from "eslint-plugin-astro"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

export default defineConfig(
  globalIgnores(["coverage/**", "dist/**", "node_modules/**"]),
  {
    extends: [
      js.configs.recommended,
      ts.configs.recommended,
      prettier,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      ...eslintPluginAstro.configs.recommended,
    ],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    files: ["*.astro", "**/*.astro"],
  },
  {
    // Override or add rule settings here, such as:
    rules: {},
  },
)
