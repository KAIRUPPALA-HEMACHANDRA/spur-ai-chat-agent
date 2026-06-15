import type { ChatResponse } from "../types/chat";

const API_BASE_URL = "http://localhost:3000";

export async function sendMessage(
  message: string,
  sessionId?: string
): Promise<ChatResponse> {
  const response = await fetch(
    `${API_BASE_URL}/chat/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to send message"
    );
  }

  return response.json();
}

export async function getConversation(
  sessionId: string
) {
  const response = await fetch(
    `${API_BASE_URL}/chat/${sessionId}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch conversation"
    );
  }

  return response.json();
}