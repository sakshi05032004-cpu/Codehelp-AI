import { GoogleGenAI } from "@google/genai";

export async function askGemini(code, action) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });

  let instruction;

  if (action === "Explain") {
    instruction = `
Explain this code in simple beginner-friendly language.
Break the code down step by step.
Explain important concepts used.
`;
  } else if (action === "Debug") {
    instruction = `
Debug this code.
Tell me:
1. What is wrong
2. Why it is wrong
3. How to fix it
4. Give corrected code if necessary
`;
  } else if (action === "Complexity") {
    instruction = `
Analyze this code.
Give:
1. Time complexity
2. Space complexity
3. Simple explanation
`;
  } else {
    instruction = "Explain and help with this programming problem.";
  }

  const prompt = `
You are CodeMentor AI, a programming assistant.

${instruction}

User's code/problem:

${code}

Keep your answer clear and beginner-friendly.
`;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return result.text;
}
