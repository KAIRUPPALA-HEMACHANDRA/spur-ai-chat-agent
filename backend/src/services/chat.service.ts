import { SenderType } from "@prisma/client";

import { ConversationRepository } from "../repositories/conversation.repository.js";
import { MessageRepository } from "../repositories/message.repository.js";
import { GeminiProvider } from "../providers/gemini.provider.js";
import { ChatMessage } from "../types/chat.types.js";
import { NotFoundError }
  from "../errors/not-found.error.js";


export class ChatService {
  private conversationRepo = new ConversationRepository();
  private messageRepo = new MessageRepository();
  private llmProvider = new GeminiProvider();



  async sendMessage(
    message: string,
    sessionId?: string
  ) {
    let conversationId = sessionId;

    if (!conversationId) {
      const conversation =
        await this.conversationRepo.create();

      conversationId = conversation.id;
    } else {
      const conversation =
        await this.conversationRepo.findById(
          conversationId
        );

      if (!conversation) {
        throw new NotFoundError(
          "Conversation not found"
        );
      }
    }

    const previousMessages =
      await this.messageRepo.findByConversationId(
        conversationId
      );

    const history: ChatMessage[] =
      previousMessages
        .slice(-20)
        .map((msg) => ({
          role:
            msg.sender === SenderType.USER
              ? "user"
              : "assistant",
          content: msg.content,
        }));

    await this.messageRepo.create(
      conversationId,
      SenderType.USER,
      message
    );

    let reply: string;

    try {
      reply =
        await this.llmProvider.generateReply(
          history,
          message
        );
    } catch (error) {
      console.error(error);

      reply =
        "Sorry, our support agent is currently unavailable. Please try again later.";
    }

    await this.messageRepo.create(
      conversationId,
      SenderType.AI,
      reply
    );

    return {
      reply,
      sessionId: conversationId,
    };
  }

  async getConversation(
    sessionId: string
  ) {
    return this.messageRepo.findByConversationId(
      sessionId
    );
  }

}
