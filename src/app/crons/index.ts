import cron from "@elysiajs/cron";
import Elysia from "elysia";

export const appCrons = new Elysia().use(
  cron({
    name: "heartbeat",
    pattern: "*/10 * * * * *",
    run() {},
  })
);
