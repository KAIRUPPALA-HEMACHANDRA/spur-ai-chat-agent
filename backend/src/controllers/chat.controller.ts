import { FastifyReply, FastifyRequest } from "fastify";

import { ChatService } from "../services/chat.service.js";
import { sendMessageSchema } from "../validators/chat.validator.js";

export class ChatController {
  private chatService = new ChatService();

  async sendMessage(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = sendMessageSchema.parse(request.body);

      const result = await this.chatService.sendMessage(
        body.message,
        body.sessionId,
      );

      return reply.send(result);
    } catch (error) {
      request.log.error(error);

      const message =
        error instanceof Error ? error.message : "Something went wrong";

      return reply.status(400).send({
        error: message,
      });
    }
  }

  async getConversation(
    request: FastifyRequest<{
      Params: {
        sessionId: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const { sessionId } = request.params;

    const messages = await this.chatService.getConversation(sessionId);

    return reply.send({
      sessionId,
      messages,
    });
  }
}
