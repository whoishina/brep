import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/config": path.resolve(__dirname, "./src/config"),
      "@": path.resolve(__dirname, "./src/frontend"),
      "#": path.resolve(__dirname, "./src/backend"),
    },
  },
  publicDir: "public/",
  // build config
  build: {
    outDir: "dist/html",
    emptyOutDir: true,
    copyPublicDir: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/@radix-ui/react-")) {
            return "ui-vendor";
          }
          if (
            id.includes("node_modules/lodash") ||
            id.includes("node_modules/date-fns") ||
            id.includes("node_modules/zod")
          ) {
            return "utils-vendor";
          }
        },
      },
    },
  },
  cacheDir: "dist/cache",
});
