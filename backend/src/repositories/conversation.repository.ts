import { prisma } from "../db/prisma.js";

export class ConversationRepository {
  async create() {
    return prisma.conversation.create({
      data: {},
    });
  }

  async findById(id: string) {
    return prisma.conversation.findUnique({
      where: { id },
    });
  }
}