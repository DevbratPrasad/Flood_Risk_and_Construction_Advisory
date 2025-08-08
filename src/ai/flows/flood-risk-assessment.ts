'use server';

/**
 * @fileOverview Assesses the flood risk for a given property.
 *
 * - assessFloodRisk - A function that assesses flood risk.
 * - FloodRiskAssessmentInput - The input type for the assessFloodRisk function.
 * - FloodRiskAssessmentOutput - The return type for the assessFloodRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FloodRiskAssessmentInputSchema = z.object({
  address: z.string().describe('The address to assess flood risk for.'),
  latitude: z.number().describe('Latitude of the location.'),
  longitude: z.number().describe('Longitude of the location.'),
});
export type FloodRiskAssessmentInput = z.infer<typeof FloodRiskAssessmentInputSchema>;

const FloodRiskAssessmentOutputSchema = z.object({
  riskLevel: z
    .enum(['Low', 'Medium', 'High'])
    .describe('The flood risk level for the property.'),
  riskFactors: z
    .string()
    .describe('The factors contributing to the flood risk.'),
  recommendations: z
    .string()
    .describe('Recommendations to mitigate the flood risk.'),
});
export type FloodRiskAssessmentOutput = z.infer<typeof FloodRiskAssessmentOutputSchema>;

export async function assessFloodRisk(input: FloodRiskAssessmentInput): Promise<FloodRiskAssessmentOutput> {
  return assessFloodRiskFlow(input);
}

const assessFloodRiskPrompt = ai.definePrompt({
  name: 'assessFloodRiskPrompt',
  input: {schema: FloodRiskAssessmentInputSchema},
  output: {schema: FloodRiskAssessmentOutputSchema},
  prompt: `You are an expert in flood risk assessment. You will analyze the provided address and location data to determine the flood risk level, contributing factors, and provide recommendations for mitigation.

Address: {{{address}}}
Latitude: {{{latitude}}}
Longitude: {{{longitude}}}

Based on this information, assess the flood risk and provide the following information:
- Risk Level (Low, Medium, High)
- Risk Factors
- Recommendations`,
});

const assessFloodRiskFlow = ai.defineFlow(
  {
    name: 'assessFloodRiskFlow',
    inputSchema: FloodRiskAssessmentInputSchema,
    outputSchema: FloodRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await assessFloodRiskPrompt(input);
    return output!;
  }
);
