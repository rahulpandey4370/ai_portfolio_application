'use server';

/**
 * @fileOverview Summarizes a project in one line using GenAI.
 *
 * - summarizeProject - A function that summarizes a project.
 * - SummarizeProjectInput - The input type for the summarizeProject function.
 * - SummarizeProjectOutput - The return type for the summarizeProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProjectInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The description of the project that needs to be summarized.'),
});

export type SummarizeProjectInput = z.infer<typeof SummarizeProjectInputSchema>;

const SummarizeProjectOutputSchema = z.object({
  summary: z.string().describe('A one-line summary of the project.'),
});

export type SummarizeProjectOutput = z.infer<typeof SummarizeProjectOutputSchema>;

export async function summarizeProject(input: SummarizeProjectInput): Promise<SummarizeProjectOutput> {
  return summarizeProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProjectPrompt',
  input: {schema: SummarizeProjectInputSchema},
  output: {schema: SummarizeProjectOutputSchema},
  prompt: `Summarize the following project description in one line:\n\n{{projectDescription}}`,
});

const summarizeProjectFlow = ai.defineFlow(
  {
    name: 'summarizeProjectFlow',
    inputSchema: SummarizeProjectInputSchema,
    outputSchema: SummarizeProjectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
