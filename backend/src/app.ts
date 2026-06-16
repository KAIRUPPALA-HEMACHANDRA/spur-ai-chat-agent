import Fastify from "fastify";
import cors from "@fastify/cors";

import { chatRoutes } from "./routes/chat.route.js";

export const buildApp = async () => {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: true,
  });

  app.get("/", async () => {
    return {
      status: "ok",
      service: "Spur AI Chat Agent",
    };
  });

  app.get("/health", async () => {
    return {
      status: "ok",
    };
  });

  app.register(chatRoutes);

  return app;
};



// import Fastify from "fastify";
// import cors from "@fastify/cors";
// import { chatRoutes } from "./routes/chat.route.js";

// export const buildApp = () => {
//   const app = Fastify({
//     logger: true,
//   });

//   app.get("/health", async () => {
//     return {
//       status: "ok",
//     };
//   });

//   app.register(chatRoutes);

//   return app;
// };
