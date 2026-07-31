// https://docs.expo.dev/guides/using-eslint/
import prettier from "eslint-config-prettier"
import path from "node:path"
import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import ts from "typescript-eslint"
import expoConfig from "eslint-config-expo/flat.js"

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore")

export default defineConfig(
  globalIgnores([...gitignorePath]),
  js.configs.recommended,
  ts.configs.recommended,
  prettier,
  expoConfig,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    // Override or add rule settings here, such as:
    rules: {},
  },
)
