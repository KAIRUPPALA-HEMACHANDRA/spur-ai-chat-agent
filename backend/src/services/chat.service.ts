import { SenderType } from "@prisma/client";

import { ConversationRepository } from "../repositories/conversation.repository.js";
import { MessageRepository } from "../repositories/message.repository.js";
import { GeminiProvider } from "../providers/gemini.provider.js";
import { ChatMessage } from "../types/chat.types.js";


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
    }

    const previousMessages =
      await this.messageRepo.findByConversationId(
        conversationId
      );

    const history: ChatMessage[] =
      previousMessages.map((msg) => ({
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

    const reply =
      await this.llmProvider.generateReply(
        history,
        message
      );

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
