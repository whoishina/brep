import { staticPlugin } from "@elysiajs/static";

export type AppStaticsConfig = Parameters<typeof staticPlugin>[0];

export const appStaticsConfig: AppStaticsConfig = {
  prefix: "assets",
  assets: "public",
};
