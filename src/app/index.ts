import { cors } from "@elysiajs/cors";
import { staticPlugin as statics } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { appStaticsConfig } from "../config/app-statics.config";
import { appConfig, serveConfig } from "../config/serve.config";
import { swaggerConfig } from "../config/swagger.config";
import { appCrons } from "./crons";
import { moduleRegister } from "./modules";

/**
 * The main application instance
 */
export const app = new Elysia({
  prefix: "/api",
  serve: serveConfig,
})
  .use(cors())
  .use(statics(appStaticsConfig))
  .use(swagger(swaggerConfig))
  .use(appCrons)
  .use(moduleRegister)
  .listen(appConfig.port);

console.log(`🦊 Elysia is running at ${appConfig.hostname}:${appConfig.port}`);

export type Backend = typeof app;
