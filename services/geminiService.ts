
import { GoogleGenAI } from "@google/genai";

export const askFabricCare = async (question: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are the "Linen Junction Care Assistant". You are an expert in high-quality linen fabrics.
    Provide concise, practical advice on washing, drying, ironing, and storing linen garments.
    Emphasize sustainability and fabric longevity.
    If the user asks something unrelated to linen or fabric care, politely redirect them.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having trouble connecting to my knowledge base. Please try again later.";
  }
};
