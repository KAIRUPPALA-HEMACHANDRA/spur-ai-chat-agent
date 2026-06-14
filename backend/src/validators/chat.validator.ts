import { z } from "zod";

export const sendMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(2000, "Message is too long"),

  sessionId: z
    .string()
    .optional(),
});

export type SendMessageRequest =
  z.infer<typeof sendMessageSchema>;