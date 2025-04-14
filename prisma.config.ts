import type { PrismaConfig } from "prisma";

export default {
  earlyAccess: true,
  schema: {
    kind: "single",
    filePath: "./src/prisma/schema.prisma",
  },
} satisfies PrismaConfig;
