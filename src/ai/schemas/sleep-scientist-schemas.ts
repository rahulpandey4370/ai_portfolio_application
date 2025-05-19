
/**
 * @fileOverview Zod schemas for the AI Sleep Scientist feature.
 *
 * - SleepInputSchema - Input schema for sleep analysis.
 * - SleepOutputSchema - Output schema for sleep analysis results.
 * - SleepInput - TypeScript type for SleepInputSchema.
 * - SleepOutput - TypeScript type for SleepOutputSchema.
 */

import { z } from 'zod';

export const SleepInputSchema = z.object({
  ageRange: z.enum(['18-25', '26-40', '41-60', '60+'], {
    required_error: 'Age range is required.',
  }).describe('The age range of the user.'),
  chronotype: z.enum(['Morning Person', 'Night Owl', 'Flexible/Neither'], {
    required_error: 'Chronotype is required.',
  }).describe("User's chronotype or natural tendency for sleep/wake times."),
  typicalBedtime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g., 23:00 or 11:00).")
    .describe('User\'s typical bedtime in HH:MM format (e.g., "23:00" for 11 PM).'),
  typicalWakeTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g., 07:00 or 7:00).")
    .describe('User\'s typical wake-up time in HH:MM format (e.g., "07:00" for 7 AM).'),
  desiredSleepHours: z.number({
    required_error: 'Desired sleep hours are required.',
    invalid_type_error: 'Desired sleep hours must be a number.',
  }).min(4, 'Desired sleep should be at least 4 hours.').max(12, 'Desired sleep should not exceed 12 hours.')
    .describe('Number of hours of sleep the user desires per night.'),
  sleepActivityLevel: z.enum(['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'], {
    required_error: 'Activity level is required.',
  }).describe('User\'s general daily physical activity level.'),
  primaryGoal: z.enum(['Optimize Wake-up Time', 'Optimize Bedtime', 'Understand Sleep Debt', 'General Advice'], {
    required_error: 'Primary goal is required.',
  }).describe('The user\'s primary goal for this sleep analysis.'),
  sleepEnvironmentNotes: z.string().max(300, "Please keep environment notes under 300 characters.").optional().describe("User's notes on their sleep environment (e.g., darkness, quietness, temperature, comfort)."),
  preSleepHabitsNotes: z.string().max(300, "Please keep pre-sleep habit notes under 300 characters.").optional().describe("User's notes on pre-sleep habits (e.g., screen time, caffeine/alcohol intake, relaxation routines)."),
  dailyStressLevels: z.string().max(300, "Please keep stress level notes under 300 characters.").optional().describe("User's notes on daily stress levels or specific stressors affecting sleep."),
});
export type SleepInput = z.infer<typeof SleepInputSchema>;

export const SleepOutputSchema = z.object({
  calculatedSleepDuration: z.string().describe("A human-readable string describing the user's typical sleep duration based on their input, e.g., 'You typically get 7 hours and 30 minutes of sleep.'"),
  recommendedBedtime: z.string().describe("The AI's recommended bedtime for the user, formatted as HH:MM AM/PM or HH:MM."),
  recommendedWakeTime: z.string().describe("The AI's recommended wake-up time for the user, formatted as HH:MM AM/PM or HH:MM."),
  dailySleepDebt: z.string().describe("A human-readable string describing the user's daily sleep debt, e.g., 'You have a daily sleep debt of 30 minutes.' or 'You are meeting your daily sleep needs!'"),
  weeklySleepDebt: z.string().describe("A human-readable string describing the user's weekly sleep debt based on the daily calculation."),
  personalizedTips: z.array(z.string()).min(1).describe("An array of at least one short, actionable, personalized sleep tip based on all user inputs, especially their primary goal, activity level, chronotype, and descriptive notes."),
  consistencyScore: z.string().describe("A qualitative assessment of the user's current sleep schedule consistency (e.g., 'Good', 'Fair', 'Could be improved') based on their typical bedtime and wake time."),
  disclaimer: z.string().describe("A standard disclaimer stating this is not medical advice."),
});
export type SleepOutput = z.infer<typeof SleepOutputSchema>;
