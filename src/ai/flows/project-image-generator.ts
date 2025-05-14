
'use server';
/**
 * @fileOverview Generates an image based on a text prompt using GenAI.
 *
 * - generateProjectImage - A function that generates an image.
 * - GenerateProjectImageInput - The input type for the generateProjectImage function.
 * - GenerateProjectImageOutput - The return type for the generateProjectImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectImageInputSchema = z.object({
  prompt: z
    .string()
    .describe('The text prompt to generate an image from.'),
});

export type GenerateProjectImageInput = z.infer<typeof GenerateProjectImageInputSchema>;

const GenerateProjectImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});

export type GenerateProjectImageOutput = z.infer<typeof GenerateProjectImageOutputSchema>;

export async function generateProjectImage(input: GenerateProjectImageInput): Promise<GenerateProjectImageOutput> {
  return generateProjectImageFlow(input);
}

const generateProjectImageFlow = ai.defineFlow(
  {
    name: 'generateProjectImageFlow',
    inputSchema: GenerateProjectImageInputSchema,
    outputSchema: GenerateProjectImageOutputSchema,
  },
  async (input) => {
    try {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // Specified model for image generation
        prompt: input.prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // Must provide both
        },
      });

      if (media && media.url) {
        return {imageDataUri: media.url};
      } else {
        console.error('Image generation did not return a media URL for prompt:', input.prompt);
        // Fallback to a default placeholder or throw a more specific error
        // For now, returning a placeholder data URI to prevent crashes, but ideally, this should be handled better.
        return {imageDataUri: 'https://placehold.co/600x400.png?text=Error+Generating'};
      }
    } catch (error) {
        console.error('Error generating image for prompt:', input.prompt, error);
        // Fallback for errors during generation
        return {imageDataUri: 'https://placehold.co/600x400.png?text=Generation+Failed'};
    }
  }
);
