import { Elysia } from "elysia";
import { createUserSchemas } from "./schemas/create-user.schema";
import { asError, asSuccess } from "../common/response";

export const createUser = new Elysia().post(
  "/create",
  ({ body: { name }, set }) => {
    if (name.length < 5) {
      set.status = 400;
      return asError(
        "NAME_TOO_SHORT",
        "Name must be at least 5 characters long"
      );
    }

    return asSuccess({
      name,
    });
  },
  {
    body: createUserSchemas,
    detail: {
      tags: ["Authentication"],
      description:
        "Example create user endpoint, will be removed in production",
      deprecated: true,
    },
  }
);
