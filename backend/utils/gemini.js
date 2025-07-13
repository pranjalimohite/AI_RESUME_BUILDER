// backend/utils/gemini.js
const { GoogleGenAI } = require('@google/generative-ai');

async function generateSummary({ jobTitle, experience }) {
  const ai = new GoogleGenAI({
    apiKey: process.env.VITE_GEMINI_API_KEY, // Make sure your .env has GEMINI_API_KEY
  });

  const model = 'gemini-2.5-flash';
  const prompt = `Give me a professional summary for a ${jobTitle} in 4-5 sentences with ${experience} of experience.`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      responseMimeType: 'text/plain',
    },
  });

  // The response structure may vary; adjust as needed
  return response.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

module.exports = { generateSummary };
