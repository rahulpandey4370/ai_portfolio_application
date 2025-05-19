
'use server';
/**
 * @fileOverview An AI flow that analyzes user's sleep habits and provides recommendations.
 * It uses a chain-of-thought style prompting to guide the LLM's reasoning.
 * - analyzeSleepData - A function that takes user sleep input and returns analysis and recommendations.
 */

import { ai } from '@/ai/genkit';
import { SleepInputSchema, SleepOutputSchema, type SleepInput, type SleepOutput } from '@/ai/schemas/sleep-scientist-schemas';

export async function analyzeSleepData(input: SleepInput): Promise<SleepOutput> {
  return sleepScientistFlow(input);
}

const sleepScientistPrompt = ai.definePrompt({
  name: 'sleepScientistPrompt',
  input: { schema: SleepInputSchema },
  output: { schema: SleepOutputSchema },
  prompt: `You are an AI Sleep & Wellness Coach. Your goal is to analyze the user's sleep habits and provide actionable, personalized recommendations.
Please think step-by-step to generate your analysis. Consider all provided inputs for each part of your response.

The user has provided the following information:
- Age Range: {{ageRange}}
- Chronotype: {{chronotype}}
- Typical Bedtime: {{typicalBedtime}}
- Typical Wake-up Time: {{typicalWakeTime}}
- Desired Sleep Hours: {{desiredSleepHours}} hours
- Daily Physical Activity Level: {{sleepActivityLevel}}
- Primary Goal for this analysis: {{primaryGoal}}
- Notes on Sleep Environment: {{#if sleepEnvironmentNotes}}{{sleepEnvironmentNotes}}{{else}}Not provided.{{/if}}
- Notes on Pre-Sleep Habits: {{#if preSleepHabitsNotes}}{{preSleepHabitsNotes}}{{else}}Not provided.{{/if}}
- Notes on Daily Stress Levels: {{#if dailyStressLevels}}{{dailyStressLevels}}{{else}}Not provided.{{/if}}

Based on ALL this information, please provide the following in JSON format:

1.  **calculatedSleepDuration**:
    *   First, determine the hours and minutes between the user's typical bedtime and wake-up time.
    *   If typical bedtime is later than typical wake-up time, assume bedtime is on day 1 and wake-up is on day 2 (e.g., 11 PM to 7 AM is 8 hours).
    *   Present this as a human-readable string, for example: "You typically get X hours and Y minutes of sleep."

2.  **dailySleepDebt**:
    *   Compare the 'calculatedSleepDuration' to their 'desiredSleepHours'.
    *   If they sleep less, state the difference (e.g., "You have a daily sleep debt of Z hours and W minutes.").
    *   If they meet or exceed it, state something like "You are meeting your daily sleep needs!" or "You are getting slightly more sleep than desired, which is generally fine."

3.  **weeklySleepDebt**:
    *   Calculate the weekly sleep debt based on the daily sleep debt (daily debt * 7).
    *   If there's no daily debt, state that weekly debt is also zero or minimal.

4.  **recommendedBedtime & recommendedWakeTime**:
    *   Consider the user's 'primaryGoal', 'desiredSleepHours', and 'chronotype'.
    *   If 'primaryGoal' is 'Optimize Bedtime': Calculate a recommended bedtime based on their 'typicalWakeTime' minus 'desiredSleepHours'. Subtract an additional 15 minutes to allow for falling asleep. Adjust slightly if 'chronotype' suggests an earlier or later natural tendency (e.g., Morning Person might be slightly earlier).
    *   If 'primaryGoal' is 'Optimize Wake-up Time': Calculate a recommended wake-up time based on their 'typicalBedtime' plus 'desiredSleepHours'. Adjust slightly if 'chronotype' suggests an earlier or later natural tendency.
    *   If 'primaryGoal' is 'Understand Sleep Debt' or 'General Advice': Suggest a balanced schedule that aligns with 'desiredSleepHours' and respects their 'chronotype' as much as possible. Provide one clear pair of recommendedBedtime and recommendedWakeTime.
    *   Ensure recommended times are logical (e.g., bedtime is before wake time).
    *   Format these times clearly, e.g., "10:45 PM" or "06:30 AM".

5.  **consistencyScore**:
    *   Provide a qualitative assessment of their current sleep schedule's consistency (e.g., "Excellent", "Good", "Fair", "Could be improved"). A very specific bedtime/wake time input suggests higher consistency than vague inputs if they were allowed (though our input is specific). Consider if their typical times align well with general healthy patterns for their chronotype.

6.  **personalizedTips**:
    *   Provide AT LEAST ONE and ideally three short, actionable, highly personalized sleep tips.
    *   These tips MUST consider the user's 'ageRange', 'chronotype', 'sleepActivityLevel', 'primaryGoal', AND their notes on 'sleepEnvironmentNotes', 'preSleepHabitsNotes', and 'dailyStressLevels'.
    *   Explain briefly *why* each tip is relevant to their specific inputs. For example, if chronotype is 'Night Owl' and they report high stress, tips should address managing stress for a later sleep schedule. If 'sleepEnvironmentNotes' mention noise, a tip could be about earplugs.

7.  **disclaimer**: Include the standard disclaimer: "This AI-generated advice is for informational purposes only and is not a substitute for professional medical or sleep specialist consultation. Individual sleep needs and conditions can vary significantly."

Return your response strictly in the JSON format described by the output schema.
Make sure all time calculations are accurate. For calculating duration between bedtime and wake time:
If Bedtime HH:MM is B1:M1 and Wake Time HH:MM is W1:M2.
Convert to minutes from midnight: BedMinutes = B1*60+M1; WakeMinutes = W1*60+M2.
If WakeMinutes < BedMinutes, then WakeMinutes += 24*60 (add a day).
DurationInMinutes = WakeMinutes - BedMinutes.
Format this duration into hours and minutes for 'calculatedSleepDuration'.
Aim for realistic and helpful advice, tailoring it deeply based on ALL provided inputs.
`,
});


const sleepScientistFlow = ai.defineFlow(
  {
    name: 'sleepScientistFlow',
    inputSchema: SleepInputSchema,
    outputSchema: SleepOutputSchema,
  },
  async (input: SleepInput): Promise<SleepOutput> => {
    try {
      const { output } = await sleepScientistPrompt(input);

      if (!output) {
        console.warn('SleepScientist LLM returned null output. Using fallback. Input:', input);
        // Fallback output in case the LLM fails to generate a valid response
        return {
          calculatedSleepDuration: "Could not calculate sleep duration due to an unexpected issue.",
          recommendedBedtime: "N/A",
          recommendedWakeTime: "N/A",
          dailySleepDebt: "Could not calculate sleep debt.",
          weeklySleepDebt: "Could not calculate sleep debt.",
          personalizedTips: [
            "Ensure your bedroom is dark, quiet, and cool for optimal sleep.",
            "Avoid consuming caffeine or heavy meals close to your bedtime.",
            "Try to maintain a consistent sleep schedule, even on weekends, to regulate your body clock."
          ],
          consistencyScore: "Undetermined",
          disclaimer: "This AI-generated advice is for informational purposes only and is not a substitute for professional medical or sleep specialist consultation. Individual sleep needs and conditions can vary significantly.",
        };
      }
      // Ensure the output matches the schema, especially personalizedTips array
      if (!Array.isArray(output.personalizedTips) || output.personalizedTips.length < 1) {
          console.warn('SleepScientist LLM output for personalizedTips was not a valid array or was empty. Overriding with default tips. Output received:', output.personalizedTips);
          output.personalizedTips = [
              "Ensure your bedroom is dark, quiet, and cool for optimal sleep.",
              "Avoid consuming caffeine or heavy meals close to your bedtime.",
              "Consider establishing a relaxing pre-sleep routine."
          ];
      }
      return output;
    } catch (error) {
      console.error('Error within sleepScientistFlow during prompt execution:', error, 'Input:', input);
      // More robust fallback for unexpected errors during LLM call
      return {
        calculatedSleepDuration: "An unexpected error occurred during analysis.",
        recommendedBedtime: "N/A",
        recommendedWakeTime: "N/A",
        dailySleepDebt: "Error calculating debt.",
        weeklySleepDebt: "Error calculating debt.",
        personalizedTips: ["An error prevented tip generation. Please check your inputs or try again.", "Ensure your API key is correctly configured if this persists."],
        consistencyScore: "Error",
        disclaimer: "This AI-generated advice is for informational purposes only and is not a substitute for professional medical or sleep specialist consultation. Individual sleep needs and conditions can vary significantly. An error occurred during analysis.",
      };
    }
  }
);

