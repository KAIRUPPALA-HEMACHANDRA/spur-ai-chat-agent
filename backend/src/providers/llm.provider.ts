import { ChatMessage } from "../types/chat.types.js";

export interface LLMProvider {
  generateReply(
    history: Array<{
      role: "user" | "assistant";
      content: string;
    }>,
    userMessage: string
  ): Promise<string>;
}
export interface LLMProvider {
  generateReply(
    history: ChatMessage[],
    userMessage: string
  ): Promise<string>;
}