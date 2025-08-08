'use server';

/**
 * @fileOverview Provides AI-driven recommendations on flood-resistant building materials.
 *
 * - constructionAdvisory - A function that provides construction recommendations.
 * - ConstructionAdvisoryInput - The input type for the constructionAdvisory function.
 * - ConstructionAdvisoryOutput - The return type for the constructionAdvisory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConstructionAdvisoryInputSchema = z.object({
  location: z.string().describe('The geographical location for the construction project.'),
  floodRiskLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('The flood risk level of the location.'),
  houseType: z.string().describe('The type of house being constructed (e.g., single-family, multi-story).'),
  budget: z.string().describe('The budget available for construction.'),
});
export type ConstructionAdvisoryInput = z.infer<typeof ConstructionAdvisoryInputSchema>;

const ConstructionAdvisoryOutputSchema = z.object({
  recommendations: z.string().describe('AI-driven recommendations on flood-resistant building materials and techniques.'),
});
export type ConstructionAdvisoryOutput = z.infer<typeof ConstructionAdvisoryOutputSchema>;

export async function constructionAdvisory(input: ConstructionAdvisoryInput): Promise<ConstructionAdvisoryOutput> {
  return constructionAdvisoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'constructionAdvisoryPrompt',
  input: {schema: ConstructionAdvisoryInputSchema},
  output: {schema: ConstructionAdvisoryOutputSchema},
  prompt: `You are an expert construction advisor specializing in flood-resistant building techniques.

  Based on the location, flood risk level, house type, and budget, provide detailed recommendations on suitable building materials and construction techniques.

  Location: {{{location}}}
  Flood Risk Level: {{{floodRiskLevel}}}
  House Type: {{{houseType}}}
  Budget: {{{budget}}}

  Provide specific and actionable advice to enhance the flood resistance of the building.
  `, // corrected typo here
});

const constructionAdvisoryFlow = ai.defineFlow(
  {
    name: 'constructionAdvisoryFlow',
    inputSchema: ConstructionAdvisoryInputSchema,
    outputSchema: ConstructionAdvisoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
