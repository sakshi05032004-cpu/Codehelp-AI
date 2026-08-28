"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (action: string) => {
    if (!code.trim()) {
      alert("Please enter your code or problem first.");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          action,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResponse(data.response);
    } catch (error) {
      setResponse(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            CodeMentor AI
          </h1>

          <p className="text-gray-400 mt-2">
            Your simple AI coding assistant
          </p>
        </div>

        {/* Input */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <label className="block text-lg font-semibold mb-3">
            Enter your code or problem
          </label>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code or programming problem here..."
            className="w-full h-64 bg-gray-950 border border-gray-700 rounded-lg p-4 text-gray-200 outline-none focus:border-blue-500 resize-none"
          />

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => askAI("Explain")}
              disabled={loading}
              className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Explain
            </button>

            <button
              onClick={() => askAI("Debug")}
              disabled={loading}
              className="px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              Debug
            </button>

            <button
              onClick={() => askAI("Complexity")}
              disabled={loading}
              className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Complexity
            </button>
          </div>
        </div>

        {/* Response */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-8">
          <h2 className="text-xl font-semibold mb-4">
            AI Response
          </h2>

          {loading ? (
            <p className="text-gray-400">
              Thinking...
            </p>
          ) : response ? (
            <pre className="whitespace-pre-wrap text-gray-300 leading-7">
              {response}
            </pre>
          ) : (
            <p className="text-gray-500">
              Your AI response will appear here.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}
