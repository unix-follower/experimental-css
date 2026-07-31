import { defineConfig } from "vite"
import { builtinModules } from "node:module"

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: "./src/main.ts",
      formats: ["es"],
      fileName: "main",
    },
    ssr: true,
    rollupOptions: {
      platform: "node",
      external: ["electron", ...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
      output: {
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
})
