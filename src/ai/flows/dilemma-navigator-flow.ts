
'use server';
/**
 * @fileOverview An AI flow that generates ethical dilemmas related to AI and provides perspectives.
 *
 * - navigateDilemma - A function that generates a new AI ethical dilemma and perspectives.
 * - DilemmaNavigatorOutput - The return type for the navigateDilemma function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DilemmaNavigatorOutputSchema = z.object({
  dilemma: z.string().describe('A challenging ethical question or scenario related to AI, 1-2 sentences long.'),
  perspectives: z.array(z.string()).length(3).describe('An array of three distinct perspectives or key considerations related to the dilemma. Each perspective should be 1-2 sentences.'),
});
export type DilemmaNavigatorOutput = z.infer<typeof DilemmaNavigatorOutputSchema>;

export async function navigateDilemma(): Promise<DilemmaNavigatorOutput> {
  return dilemmaNavigatorFlow();
}

const dilemmaNavigatorPrompt = ai.definePrompt({
  name: 'dilemmaNavigatorPrompt',
  output: {schema: DilemmaNavigatorOutputSchema},
  prompt: `You are an AI ethicist. Your task is to generate a thought-provoking ethical dilemma related to artificial intelligence.
The dilemma itself should be concise, around 1-2 sentences.
Then, provide exactly three distinct perspectives or key considerations related to this dilemma. Each perspective should also be 1-2 sentences.
Do not take a definitive stance or offer a solution yourself. The goal is to present different facets of the issue to encourage thought.`,
});

const dilemmaNavigatorFlow = ai.defineFlow(
  {
    name: 'dilemmaNavigatorFlow',
    outputSchema: DilemmaNavigatorOutputSchema,
  },
  async () => {
    const {output} = await dilemmaNavigatorPrompt({});
    if (!output) {
      return {
        dilemma: "An unexpected error occurred while generating a dilemma. Please try again.",
        perspectives: ["Could not load perspectives.", "Please try again later.", "Ensure the AI model is responsive."],
      };
    }
    return output;
  }
);
