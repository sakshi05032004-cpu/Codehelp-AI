"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    if (!code.trim()) {
      setResponse("Please enter some code or a programming problem.");
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
          code: code,
          action: action,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResponse(data.response);
    } catch (error) {
      console.error("Frontend error:", error);
      setResponse(
        error.message || "Failed to get response from AI."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1>CodeMentor AI</h1>
        <p>Your simple AI coding assistant</p>
      </header>

      <section className="card">
        <h2>Enter your code or problem</h2>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code or programming problem here..."
          disabled={loading}
        />

        <div className="buttons">
          <button
            className="explain"
            onClick={() => handleAction("Explain")}
            disabled={loading}
          >
            Explain
          </button>

          <button
            className="debug"
            onClick={() => handleAction("Debug")}
            disabled={loading}
          >
            Debug
          </button>

          <button
            className="complexity"
            onClick={() => handleAction("Complexity")}
            disabled={loading}
          >
            Complexity
          </button>
        </div>
      </section>

      <section className="response-card">
        <h2>AI Response</h2>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>CodeMentor AI is thinking...</p>
          </div>
        ) : response ? (
          <pre className="response">{response}</pre>
        ) : (
          <p className="placeholder">
            Your AI response will appear here.
          </p>
        )}
      </section>
    </main>
  );
}
