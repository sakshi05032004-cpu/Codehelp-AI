import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function askGemini(code, action) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  let instruction = "";

  if (action === "Explain") {
    instruction = `
Explain the following code in simple terms.

Break down the logic step by step.
Mention important programming concepts used.
`;
  } else if (action === "Debug") {
    instruction = `
Analyze the following code for errors or bugs.

Give:
1. What is wrong
2. Why it happens
3. How to fix it

If the code is correct, clearly say so.
`;
  } else if (action === "Complexity") {
    instruction = `
Analyze the following code.

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

  try {
    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);

    throw new Error("Gemini API request failed");
  }
}
