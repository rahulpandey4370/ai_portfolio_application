
'use server';
/**
 * @fileOverview An AI flow for handling follow-up questions about a generated sleep report.
 * - chatWithSleepCoach - A function that takes the original report, user query, and chat history.
 */

import { ai } from '@/ai/genkit';
import { SleepChatInputSchema, SleepChatOutputSchema, type SleepChatInput, type SleepChatOutput } from '@/ai/schemas/sleep-chat-schemas';

export async function chatWithSleepCoach(input: SleepChatInput): Promise<SleepChatOutput> {
  return sleepChatFlow(input);
}

const sleepChatPrompt = ai.definePrompt({
  name: 'sleepChatPrompt',
  input: { schema: SleepChatInputSchema },
  output: { schema: SleepChatOutputSchema },
  prompt: `You are an AI Sleep & Wellness Coach, continuing a conversation with a user about their sleep analysis report.
The user has already received the following report from you:

ORIGINAL SLEEP REPORT:
Calculated Sleep Duration: {{originalReport.calculatedSleepDuration}}
Recommended Bedtime: {{originalReport.recommendedBedtime}}
Recommended Wake-up Time: {{originalReport.recommendedWakeTime}}
Daily Sleep Debt: {{originalReport.dailySleepDebt}}
Weekly Sleep Debt: {{originalReport.weeklySleepDebt}}
Consistency Score: {{originalReport.consistencyScore}}
Personalized Tips:
{{#each originalReport.personalizedTips}}
- {{{this}}}
{{/each}}
Disclaimer: {{originalReport.disclaimer}}

CONVERSATION HISTORY (if any):
{{#if chatHistory}}
{{#each chatHistory}}
{{this.sender}}: {{this.text}}
{{/each}}
{{/if}}

USER'S CURRENT QUESTION: {{{userQuery}}}

Your task is to answer the user's follow-up question.
- Base your response *only* on the information contained within the ORIGINAL SLEEP REPORT and the provided CHAT HISTORY.
- Do NOT introduce new analysis or recommendations that are not derivable from the original report.
- If the user asks for clarification or elaboration on a point from the report, provide it clearly.
- If the user asks a question that cannot be answered from the report, politely state that the information is not available in the current analysis or refer them to the disclaimer about professional consultation.
- Maintain a helpful, empathetic, and conversational tone.
- Keep your responses concise and directly related to the user's query.
- Do not repeat the disclaimer unless specifically asked about the limitations of the advice.
- Avoid generic greetings in follow-up responses; get straight to the point.
Response:
  `,
});

const sleepChatFlow = ai.defineFlow(
  {
    name: 'sleepChatFlow',
    inputSchema: SleepChatInputSchema,
    outputSchema: SleepChatOutputSchema,
  },
  async (input: SleepChatInput) => {
    const { output } = await sleepChatPrompt(input);

    if (!output) {
      return {
        response: "I'm sorry, I had a little trouble processing that. Could you please try rephrasing your question?",
      };
    }
    return output;
  }
);
