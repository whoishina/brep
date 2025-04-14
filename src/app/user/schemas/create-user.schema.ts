import { t, Static } from "elysia";

export const createUserSchemas = t.Object({
  name: t.String(),
});

export type CreateUserDto = Static<typeof createUserSchemas>;
