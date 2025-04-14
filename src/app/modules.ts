import { Elysia } from "elysia";
import { userModule } from "./user";

// v1 module
export const apiV1 = new Elysia({ prefix: "/v1" }).use(userModule).as("global");

// default module register
export const moduleRegister = new Elysia().use(apiV1);
