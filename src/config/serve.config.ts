import type { ElysiaConfig } from "elysia";

export const appConfig = {
  port: import.meta.env.API_PORT || 3000,
  hostname: "0.0.0.0",
};

export const serveConfig: ElysiaConfig<string>["serve"] = {
  port: appConfig.port,
  hostname: appConfig.hostname,
};
