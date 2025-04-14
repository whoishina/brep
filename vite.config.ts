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
  },
  cacheDir: "dist/cache",
});
