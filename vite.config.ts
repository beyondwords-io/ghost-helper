import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "./dist",
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "GhostHelper",
      fileName: format => `${format}.js`,
      formats: ["umd"],
    },
  }
});
