import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function askGemini(
  code: string,
  action: string
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  let instruction = "";

  if (action === "Explain") {
    instruction = `
Explain the following code or programming problem
in simple terms.

Break down the logic step by step.
Mention important concepts used in the code.
`;
  }

  if (action === "Debug") {
    instruction = `
Analyze the following code for errors or bugs.

Identify:
1. The problem
2. Why it occurs
3. How to fix it

If the code is already correct, explain that clearly.
`;
  }

  if (action === "Complexity") {
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

  const result = await model.generateContent(prompt);

  const response = result.response;

  return response.text();
}
