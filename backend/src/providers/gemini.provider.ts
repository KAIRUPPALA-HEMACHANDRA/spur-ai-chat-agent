import { GoogleGenAI } from "@google/genai";
import { LLMProvider } from "./llm.provider.js";
import { STORE_KNOWLEDGE } from "../constants/store-knowledge.js";
import { ChatMessage } from "../types/chat.types.js";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export class GeminiProvider implements LLMProvider {
  async generateReply(
    history: Array<{
      role: "user" | "assistant";
      content: string;
    }>,
    userMessage: string
  ): Promise<string> {
    const conversationHistory = history
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const prompt = `
You are a helpful customer support agent.

Store Knowledge:
${STORE_KNOWLEDGE}

Previous Conversation:
${conversationHistory}

Customer:
${userMessage}

Instructions:
- Be concise.
- Be friendly.
- Use the store knowledge whenever relevant.
- If you don't know the answer, say so honestly.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text ?? "Sorry, I couldn't generate a response.";
  }
}