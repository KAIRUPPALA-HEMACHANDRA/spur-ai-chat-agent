import { FastifyInstance } from "fastify";

import { ChatController } from "../controllers/chat.controller.js";

export async function chatRoutes(
  app: FastifyInstance
) {
  const controller =
    new ChatController();

  app.post(
    "/chat/message",
    controller.sendMessage.bind(controller)
  );

  app.get(
  "/chat/:sessionId",
  controller.getConversation.bind(controller)
);
}