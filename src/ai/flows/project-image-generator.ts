
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
  imageDataUri: z.string().describe('The generated image as a data URI, or a placeholder URL if generation fails.'),
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
           safetySettings: [ // Added safety settings to be less restrictive for creative content
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
          ],
        },
      });

      if (media && media.url) {
        return {imageDataUri: media.url};
      } else {
        console.error('Image generation did not return a media URL for prompt:', input.prompt);
        return {imageDataUri: `https://placehold.co/600x400.png?text=ImageGenFail`};
      }
    } catch (error) {
        console.error('Error generating image for prompt:', input.prompt, error);
        return {imageDataUri: `https://placehold.co/600x400.png?text=GenError`};
    }
  }
);
