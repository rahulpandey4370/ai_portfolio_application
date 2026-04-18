import { AzureOpenAI } from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { z, type ZodSchema } from 'zod';

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = '2024-02-01';
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

let client: AzureOpenAI | null = null;

function getClient() {
  if (!endpoint || !apiKey || !deployment) {
    throw new Error(
      'Azure OpenAI is enabled, but one or more required environment variables are missing: AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT_NAME.'
    );
  }

  if (!client) {
    client = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion,
    });
  }

  return client;
}

function resolvePath(source: Record<string, any>, key: string, currentContext?: any) {
  if (!key.trim()) {
    return '';
  }

  if (key.trim() === 'this') {
    return currentContext;
  }

  const parts = key.trim().split('.');
  let current =
    parts[0] === 'this'
      ? currentContext
      : source;

  const startIndex = parts[0] === 'this' ? 1 : 0;

  for (let index = startIndex; index < parts.length; index += 1) {
    const part = parts[index];
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return '';
    }
  }

  return current;
}

function simpleTemplateRender(template: string, data: Record<string, any>, currentContext?: any): string {
  let output = template;

  output = output.replace(/{{media\s+url=([^}]+)}}/g, '');

  output = output.replace(/{{#each\s+([^}]+)}}([\s\S]*?){{\/each}}/g, (_, key, content) => {
    const list = resolvePath(data, key, currentContext);
    if (!Array.isArray(list)) {
      return '';
    }

    return list
      .map((item) => simpleTemplateRender(content, data, item))
      .join('');
  });

  output = output.replace(/{{#if\s+([^}]+)}}([\s\S]*?)(?:{{else}}([\s\S]*?))?{{\/if}}/g, (_, key, truthyBlock, falsyBlock) => {
    const value = resolvePath(data, key, currentContext);
    const chosenBlock = value ? truthyBlock : (falsyBlock ?? '');
    return simpleTemplateRender(chosenBlock, data, currentContext);
  });

  output = output.replace(/{{{json\s+([^}]+)}}}/g, (_, key) => {
    const value = resolvePath(data, key, currentContext);
    return JSON.stringify(value, null, 2);
  });

  output = output.replace(/{{{\s*([^}]+)\s*}}}/g, (_, key) => {
    const value = resolvePath(data, key, currentContext);
    return value === undefined || value === null ? '' : String(value);
  });

  output = output.replace(/{{\s*([^}]+)\s*}}/g, (_, key) => {
    const value = resolvePath(data, key, currentContext);
    return value === undefined || value === null ? '' : String(value);
  });

  return output.trim();
}

export function shouldUseAzureOpenAI() {
  return process.env.AI_MODEL_PROVIDER === 'azure';
}

export async function callAzureOpenAI<T extends ZodSchema>(
  promptTemplate: string,
  input: z.infer<any>,
  outputSchema: T,
): Promise<z.infer<T>> {
  const textPrompt = simpleTemplateRender(promptTemplate, input);
  const jsonInstruction =
    'Return the response as valid JSON only. Make sure the final answer is a JSON object that matches the requested schema.';
  const combinedPrompt = `${textPrompt}\n\n${jsonInstruction}`;

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'user',
      content: [
        { type: 'text', text: combinedPrompt },
      ],
    },
  ];

  if (input.foodImage && typeof messages[0].content === 'object') {
    (messages[0].content as any[]).push({
      type: 'image_url',
      image_url: {
        url: input.foodImage,
      },
    });
  }

  try {
    const response = await getClient().chat.completions.create({
      model: deployment!,
      messages,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Azure OpenAI returned an empty response.');
    }

    const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleanedContent);
    return outputSchema.parse(parsed);
  } catch (error: any) {
    console.error('Error calling Azure OpenAI:', error);
    if (error instanceof z.ZodError) {
      throw new Error(`Azure OpenAI response failed Zod validation: ${error.message}`);
    }
    throw new Error(`Failed to get a valid response from Azure OpenAI: ${error.message}`);
  }
}

export async function callAzureOpenAIChat(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>
): Promise<string> {
  try {
    const response = await getClient().chat.completions.create({
      model: deployment!,
      messages,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error: any) {
    console.error('Error calling Azure OpenAI Chat:', error);
    throw new Error(`Failed to get a valid chat response from Azure OpenAI: ${error.message}`);
  }
}
