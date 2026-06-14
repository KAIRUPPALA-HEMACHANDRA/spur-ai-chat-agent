import Fastify from "fastify";

import { chatRoutes } from "./routes/chat.route.js";

export const buildApp = () => {
  const app = Fastify({
    logger: true,
  });

  app.get("/health", async () => {
    return {
      status: "ok",
    };
  });

  app.register(chatRoutes);

  return app;
};