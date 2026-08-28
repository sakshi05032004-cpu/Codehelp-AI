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
    <main className="container">
      <div className="wrapper">

        <div className="header">
          <h1>CodeMentor AI</h1>
          <p>Your simple AI coding assistant</p>
        </div>

        <div className="card">
          <label className="label">
            Enter your code or problem
          </label>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code or programming problem here..."
          />

          <div className="buttons">

            <button
              className="explain"
              onClick={() => askAI("Explain")}
              disabled={loading}
            >
              Explain
            </button>

            <button
              className="debug"
              onClick={() => askAI("Debug")}
              disabled={loading}
            >
              Debug
            </button>

            <button
              className="complexity"
              onClick={() => askAI("Complexity")}
              disabled={loading}
            >
              Complexity
            </button>

          </div>
        </div>

        <div className="card">
          <h2 className="response-title">
            AI Response
          </h2>

          {loading ? (
            <p className="placeholder">
              Thinking...
            </p>
          ) : response ? (
            <div className="response">
              {response}
            </div>
          ) : (
            <p className="placeholder">
              Your AI response will appear here.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}
