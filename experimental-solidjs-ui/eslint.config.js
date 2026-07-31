import path from "node:path"
import { defineConfig, includeIgnoreFile } from "eslint/config"
import js from "@eslint/js"
import globals from "globals"
import solid from "eslint-plugin-solid/configs/typescript"
import * as tsParser from "@typescript-eslint/parser"

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore")

export default defineConfig(js.configs.recommended, includeIgnoreFile(gitignorePath), {
  files: ["**/*.{ts,tsx}"],
  ...solid,
  languageOptions: {
    globals: globals.browser,
    parser: tsParser,
    parserOptions: {
      project: "tsconfig.json",
    },
  },
})
