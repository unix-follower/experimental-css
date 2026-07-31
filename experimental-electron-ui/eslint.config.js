import prettier from "eslint-config-prettier"
import path from "node:path"
import js from "@eslint/js"
import globals from "globals"
import ts from "typescript-eslint"
import { includeIgnoreFile } from "eslint/config"

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore")

export default [
  includeIgnoreFile(gitignorePath),

  // Base JS Recommended Config (eslint:recommended)
  js.configs.recommended,

  // Base TypeScript Config (plugin:@typescript-eslint/recommended)
  ...ts.configs.recommended,

  // Flat Import Plugins (plugin:import/recommended + typescript)
  //   importPlugin.flatConfigs.recommended,
  //   importPlugin.flatConfigs.typescript,

  prettier,

  // Global Options (Replaces "env" and sets specific TypeScript overrides)
  {
    languageOptions: {
      // Replaces: "env": { "browser": true, "es6": true, "node": true }
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2015, // Enables ES6/ES2015 features
      },
    },
    settings: {
      "import/ignore": ["@vitejs/plugin-react-swc", "typescript-eslint"],
    },
    rules: {
      // typescript-eslint strongly recommends that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off",
    },
  },
  // Custom overrides or adjustments
  {
    // Add any project-specific overrides here
    rules: {},
  },
]
