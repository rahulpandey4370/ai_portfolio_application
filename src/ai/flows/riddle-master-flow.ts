
'use server';
/**
 * @fileOverview An AI flow that generates riddles and their answers.
 *
 * - generateRiddle - A function that generates a new riddle and its answer.
 * - RiddleMasterOutput - The return type for the generateRiddle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiddleMasterOutputSchema = z.object({
  riddle: z.string().describe('The text of an original and clever riddle, 2-4 lines long and moderately challenging.'),
  answer: z.string().describe('The answer to the riddle.'),
});
export type RiddleMasterOutput = z.infer<typeof RiddleMasterOutputSchema>;

export async function generateRiddle(): Promise<RiddleMasterOutput> {
  return riddleMasterFlow();
}

const riddleMasterPrompt = ai.definePrompt({
  name: 'riddleMasterPrompt',
  output: {schema: RiddleMasterOutputSchema},
  prompt: `You are an exceptionally creative Riddle Master, renowned for your vast and ever-changing repertoire.
Your task is to craft a COMPLETELY ORIGINAL and clever riddle that has a high likelihood of being unique and not one you have generated recently or is commonly known.
The riddle should be 2-4 lines long and moderately challenging.
Think about diverse topics, wordplay, and unexpected perspectives.
Provide the single, definitive, and correct answer to this unique riddle separately.

Ensure utmost accuracy in the answer.
AVOID REPEATING RIDDLES. Strive for novelty and surprise with each generation.
Imagine you have a vast internal library of potential riddles; pick one that is obscure or freshly invented.`,
  config: { // Add configuration to increase temperature
    temperature: 0.95, // Higher temperature for more randomness and creativity
  }
});

const riddleMasterFlow = ai.defineFlow(
  {
    name: 'riddleMasterFlow',
    outputSchema: RiddleMasterOutputSchema,
  },
  async () => {
    const {output} = await riddleMasterPrompt({});
    if (!output) {
        return { riddle: "I'm all out of riddles at the moment! Try asking again soon.", answer: "Patience" };
    }
    return output;
  }
);

