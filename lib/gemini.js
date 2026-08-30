import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function askGemini(code, action) {
  let instruction = "";

  if (action === "Explain") {
    instruction = `
Explain the following code in simple beginner-friendly language.

Break it down step by step.
Explain what each important part does.
Mention important programming concepts.
`;
  } else if (action === "Debug") {
    instruction = `
Debug the following code.

Clearly provide:
1. The error or problem
2. Why it happens
3. How to fix it
4. Corrected code if necessary
`;
  } else if (action === "Complexity") {
    instruction = `
Analyze the following code.

Provide:
1. Time complexity
2. Space complexity
3. A simple explanation of why
`;
  } else {
    instruction = `
Help the user understand the following programming code.
`;
  }

  const prompt = `
You are CodeMentor AI, a helpful programming assistant.

${instruction}

Code/problem:

${code}

Keep the answer clear, concise and beginner-friendly.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
