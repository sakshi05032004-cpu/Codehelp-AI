import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function askGemini(
  code: string,
  action: string
) {
  let instruction = "";

  if (action === "Explain") {
    instruction = `
Explain the following code in simple terms.

Break down the logic step by step.
Mention important concepts used in the code.
`;
  } else if (action === "Debug") {
    instruction = `
Analyze the following code for errors or bugs.

Identify:
1. The problem
2. Why it occurs
3. How to fix it

If the code is already correct, explain that clearly.
`;
  } else if (action === "Complexity") {
    instruction = `
Analyze the time and space complexity of the following code.

Give:
1. Time complexity
2. Space complexity
3. Short explanation of why
`;
  }

  const prompt = `
You are CodeMentor AI, a helpful programming assistant.

${instruction}

User input:

${code}

Keep the explanation clear and beginner-friendly.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
