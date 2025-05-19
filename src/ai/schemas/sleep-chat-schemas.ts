
/**
 * @fileOverview Zod schemas for the AI Sleep Scientist follow-up chat feature.
 */
import { z } from 'zod';
import { SleepOutputSchema } from './sleep-scientist-schemas'; // Import existing SleepOutputSchema

export const SleepChatMessageSchema = z.object({
  sender: z.enum(['user', 'bot']),
  text: z.string(),
});
export type SleepChatMessage = z.infer<typeof SleepChatMessageSchema>;

export const SleepChatInputSchema = z.object({
  originalReport: SleepOutputSchema.describe("The initial sleep analysis report provided to the user."),
  userQuery: z.string().describe("The user's follow-up question about their sleep report."),
  chatHistory: z.array(SleepChatMessageSchema).max(12).optional().describe("The last 12 messages in the conversation history, including the current user query if it was already added to history on the client."),
});
export type SleepChatInput = z.infer<typeof SleepChatInputSchema>;

export const SleepChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user's follow-up question."),
});
export type SleepChatOutput = z.infer<typeof SleepChatOutputSchema>;
