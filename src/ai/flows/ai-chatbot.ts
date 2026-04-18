'use server';

import {ai} from '@/ai/genkit';
import { callAzureOpenAIChat, shouldUseAzureOpenAI } from '@/ai/azure-openai';
import {z} from 'genkit';
import { portfolioData } from '@/lib/data';
import { formatChatbotContext, retrieveChatbotContext } from '@/lib/chatbot-knowledge';

const ChatMessageSchema = z.object({
  sender: z.enum(['user', 'bot']),
  text: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const AIChatbotInputSchema = z.object({
  query: z.string().describe('The user query about Rahul.'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('The last 5 messages in the conversation history, including the current user query if it was already added to history on the client.'),
});
export type AIChatbotInput = z.infer<typeof AIChatbotInputSchema>;

const AIChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type AIChatbotOutput = z.infer<typeof AIChatbotOutputSchema>;

export async function aiChatbot(input: AIChatbotInput): Promise<AIChatbotOutput> {
  return aiChatbotFlow(input);
}

function getResponseFormatHint(query: string) {
  const normalizedQuery = query.toLowerCase();

  if (
    /list|all technologies|tech stack|years of working experience|experience in each|table/.test(
      normalizedQuery
    )
  ) {
    return `Preferred format:
- Use a markdown table.
- Recommended columns: Technology | Approx. Experience | Context / Where I used it.
- Keep entries concise and easy to scan.`;
  }

  if (/where do you work|how long|what are the projects|worked on|current role|current company/.test(normalizedQuery)) {
    return `Preferred format:
- Use short markdown sections.
- Recommended structure:
  ## Current Role
  ## Time There
  ## Key Projects
- Keep each section brief and direct.`;
  }

  if (/how does|architecture|workflow|pipeline|flow|system design|migration/.test(normalizedQuery)) {
    return `Preferred format:
- Use short markdown headers and bullets.
- When useful, show the flow as an arrow sequence like:
  Input -> Processing -> Orchestration -> Output
- Focus on clarity over detail.`;
  }

  if (/compare|difference|vs\b|versus/.test(normalizedQuery)) {
    return `Preferred format:
- Use a compact markdown comparison table or two short bullet lists.
- Keep the answer analytical and concise.`;
  }

  return `Preferred format:
- Use a short markdown answer.
- Use bullets or mini headers only if they improve readability.
- Avoid long prose blocks.`;
}

const aiChatbotFlow = ai.defineFlow(
  {
    name: 'aiChatbotFlow',
    inputSchema: AIChatbotInputSchema,
    outputSchema: AIChatbotOutputSchema,
  },
  async (input: AIChatbotInput): Promise<AIChatbotOutput> => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const retrievedSections = retrieveChatbotContext(input.query, input.chatHistory);
    const retrievedContext = formatChatbotContext(retrievedSections);
    const responseFormatHint = getResponseFormatHint(input.query);

    const systemPrompt = `You are ${portfolioData.name}, responding in first person as yourself.

Current date: ${currentDateString}
Current role: ${portfolioData.experience[0]?.role ?? portfolioData.role} at ${portfolioData.experience[0]?.company ?? 'N/A'}
Location: Bengaluru, India

Use the retrieved context below as your source of truth. This context is selected through regex, grep-style keyword scoring, and glob-style tag matching over local portfolio knowledge.

Assume the user is usually one of these:
- a recruiter evaluating fit
- a hiring manager scanning quickly
- a developer trying to understand technical depth
- a collaborator reviewing work history and projects

RETRIEVED CONTEXT
${retrievedContext}

CONVERSATION HISTORY
${input.chatHistory?.length ? input.chatHistory.slice(-5).map((msg) => `${msg.sender}: ${msg.text}`).join('\n') : 'No previous conversation.'}

RESPONSE RULES
- Stay in character as Rahul.
- Speak as if you are responding to a recruiter, hiring manager, or developer reviewing a portfolio site.
- Keep the tone natural, professional, direct, and concise.
- Prefer the most relevant retrieved context instead of dumping everything.
- If a question touches current work, mention Epicor Software Corporation and the latest experience.
- When discussing current Epicor projects, keep the language public-safe and high level.
- If information is not present in the retrieved context, say so honestly instead of inventing details.
- Do not add greetings, intros, or closing invitations unless the user explicitly asks for them.
- Do not pad the response with generic prefixes like "Here’s a concise breakdown" or suffixes like "If you want, I can also...".
- Prioritize short, easy-to-scan answers over conversational filler.
- Use markdown formatting when it improves readability.
- Use headers, bullets, tables, or arrow flows when relevant.
- For broad introduction questions, summarize current role, core strengths, and strongest work areas in the fewest useful lines.

${responseFormatHint}

CURRENT USER QUERY
${input.query}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: input.query }
    ] as const;

    if (shouldUseAzureOpenAI()) {
      const responseText = await callAzureOpenAIChat([...messages]);

      if (!responseText) {
        return { response: "I apologize, but I'm having trouble generating a response right now. Could you please try rephrasing your question or ask me something else about my background?" };
      }

      return { response: responseText };
    }

    const llmResponse = await ai.generate({
      prompt: messages.map(m => `${m.role}: ${m.content}`).join('\n') + '\nassistant:',
      model: 'googleai/gemini-2.0-flash',
      config: {
        temperature: 0.3, // Balanced creativity while maintaining consistency
        maxOutputTokens: 500, // Adequate for conversational responses
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      },
    });

    const responseText = llmResponse.text;
    if (!responseText) {
      console.warn('AI Chatbot prompt returned null output for query:', input.query, 'with history:', input.chatHistory);
      return { response: "I apologize, but I'm having trouble generating a response right now. Could you please try rephrasing your question or ask me something else about my background?" };
    }
    
    return { response: responseText };
  }
);
