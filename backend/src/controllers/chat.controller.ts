import { FastifyReply, FastifyRequest } from "fastify";

import { ChatService } from "../services/chat.service.js";
import { sendMessageSchema } from "../validators/chat.validator.js";
import { ZodError } from "zod";
import { AppError } from "../errors/app.error.js";

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
    }
    catch (error) {
      request.log.error(error);

      if (error instanceof ZodError) {
        return reply.status(400).send({
          error: error.issues[0]?.message,
        });
      }

      if (error instanceof AppError) {
        return reply.status(
          error.statusCode
        ).send({
          error: error.message,
        });
      }

      return reply.status(500).send({
        error:
          "Internal server error",
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
