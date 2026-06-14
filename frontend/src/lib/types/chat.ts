export interface ChatMessage {
  sender: "USER" | "AI";
  content: string;
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
}