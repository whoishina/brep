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
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["@radix-ui/react-*"],
          "utils-vendor": ["lodash", "date-fns", "zod"],
        },
      },
    },
  },
  cacheDir: "dist/cache",
});
