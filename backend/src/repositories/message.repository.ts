import { prisma } from "../db/prisma.js";
import { SenderType } from "@prisma/client";

export class MessageRepository {
  async create(
    conversationId: string,
    sender: SenderType,
    content: string
  ) {
    return prisma.message.create({
      data: {
        conversationId,
        sender,
        content,
      },
    });
  }

  async findByConversationId(conversationId: string) {
    return prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}