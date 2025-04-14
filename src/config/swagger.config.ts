import { ElysiaSwaggerConfig } from "@elysiajs/swagger";

export const swaggerConfig: ElysiaSwaggerConfig = {
  documentation: {
    info: {
      title: "BER Stack Documentation",
      version: "1.0.0",
      description:
        "API documentation for the BER Stack application. Built with Elysia, Express, and React.",
    },
    tags: [
      {
        name: "Authentication",
        description: "Authentication endpoints",
      },
    ],
  },
};
