import { Elysia } from "elysia";
import { createUser } from "./create";

export const userModule = new Elysia({
  prefix: "/users",
}).use(createUser);
