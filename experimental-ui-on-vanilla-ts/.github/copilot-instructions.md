# Copilot instructions for experimental-ui-on-vanilla-ts

This file gives repository-specific guidance for Copilot sessions so suggestions and automated agents work predictably.

## Where to run
All commands run from the repository root (the folder containing package.json).

## Build / Dev / Preview
- Dev server: npm run dev  # starts Vite dev server with HMR
- Production build: npm run build  # runs `tsc` (type-check) then `vite build`
- Preview production build: npm run preview

Node requirement: node >= 24.18.0 (see package.json `engines`).

## Test
This repo uses Vitest.
- Run full test suite: npm run test or npm run test:run
- Run in watch mode: npm run test:watch
- Run a single test file: npm run test -- <path/to/test-file> OR npx vitest <path/to/test-file>
- Run a single test by name (matcher): npm run test -- -t "test name"
- Generate coverage: npm run coverage

Example: npm run test -- src/__test__/unit/sample.test.ts

## Lint & Format
- Lint (project-default eslint): npm run lint
  - To lint a specific file/dir: npm run lint -- src/path or npx eslint src/path --ext .ts
- Prettier checks: npm run check-format
- Auto-format: npm run format

## High-level architecture (big picture)
- Vite + TypeScript app (entry: src/main.ts). The app is a collection of small interactive demos and experiments (canvas demos, p5 sketches, WebGPU examples).
- Major source folders:
  - src/html/canvas/*  — many HTML canvas demo modules
  - src/p5js/*         — p5.js sketches
  - src/webgpu/*       — WebGPU demo code
  - src/misc/...       — utilities (e.g., webgpu helpers)
  - public/            — static assets served at / (icons, images)
- Instrumentation: src/instrumentation.ts configures OpenTelemetry for traces and metrics; uses VITE_* env vars for OTLP endpoints.
- Tests: Vitest tests live under src/__test__/ (sample unit test provided).

## Key conventions and repo-specific patterns
- Path alias: "@/*" => ./src/* (tsconfig.json). Imports frequently use '@/...' in tests and source code.
- Public imports: paths under /public are mapped; assets may be imported directly in TS/TSX.
- GLSL and arbitrary file extensions are allowed (tsconfig: allowArbitraryExtensions=true); shaders use extensions like .frag/.vert/.glsl and are imported by demos.
- Type-checking strategy: `npm run build` runs `tsc` (noEmit) first for type checks, then `vite build` for bundling.
- Environment variables: runtime secrets/config must be prefixed with VITE_ to be available in the app (e.g., VITE_OTLP_TRACES_URL, VITE_OTLP_METRICS_URL).
- Node version and package-lock: package.json requires Node >=24.18.0; package-lock.json is present (npm is a reasonable default).
- Testing imports: tests import modules via the '@' alias; ensure test runner resolves tsconfig paths (vite plugin vite-tsconfig-paths is already listed in devDependencies).
- Demo layout: each demo module is self-contained; adding a new demo typically means adding a new file under src/html/canvas or src/p5js and an HTML entry under html/ or p5js/ for manual viewing.

## Existing AI/assistant configs scanned
- No top-level `.github/copilot-instructions.md` existed before this file.
- No CLAUDE.md, AGENTS.md, AIDER_CONVENTIONS.md, .cursorrules, .windsurfrules, or .clinerules found.
- One small README in html/canvas contains a Prometheus query used by instrumentation demos; it may be useful to surface when debugging telemetry.

---

If more detailed guidance is desired (examples of running a specific demo, how to add tests, or CI-related notes), say which area to expand.
