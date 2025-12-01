import { GoogleGenAI, Type } from "@google/genai";
import { AIInsight } from '../types';

// Initialize Gemini
// Ensure process.env.API_KEY is available in your environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMonthInsights = async (month: string, year: number): Promise<AIInsight | null> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate a minimalist, inspiring theme and 3 short bullet-point focus areas for the month of ${month} ${year}. 
    Ideally suited for a professional planning their year. Keep it brief and abstract.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theme: {
              type: Type.STRING,
              description: "A short, one or two word inspiring theme for the month (e.g., 'New Beginnings', 'Deep Focus')."
            },
            focusAreas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3 short actionable focus areas."
            }
          },
          required: ["theme", "focusAreas"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIInsight;
    }
    return null;
  } catch (error) {
    console.error("Error fetching Gemini insights:", error);
    return null;
  }
};