import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { createServer as createViteServer } from "vite";
import { moduleRegister } from "./app/modules";
import type { RenderView } from "./frontend/server-entry";

const isProduction = process.env.NODE_ENV === "production";
const templateHtml = isProduction ? await Bun.file("./index.html").text() : "";

// create runtime renderer
let render!: RenderView;
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});

export const bridge = new Elysia()
  // Register the module register
  .use(moduleRegister)
  .use(html())
  // Register the server-side rendering function
  .all("*", async ({ path }) => {
    console.log("path", path);
    let template;

    if (!isProduction) {
      // Always read fresh template in development
      template = await Bun.file("index.html").text();
      template = await vite.transformIndexHtml(path, template);
      render = (await vite.ssrLoadModule("src/frontend/server-entry.tsx"))
        .render;
    } else {
      template = templateHtml;
    }

    const rendered = render(path);
    const html = template
      // .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--ssr-outlet-->`, rendered.html ?? "");

    return html;
  })
  .listen(import.meta.env.API_PORT);
