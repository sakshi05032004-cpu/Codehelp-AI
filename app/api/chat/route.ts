import { NextResponse } from "next/server";
import { askGemini } from "../../../lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { code, action } = body;

    if (!code || !action) {
      return NextResponse.json(
        {
          error: "Code and action are required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await askGemini(code, action);

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to get response from AI.",
      },
      {
        status: 500,
      }
    );
  }
}
