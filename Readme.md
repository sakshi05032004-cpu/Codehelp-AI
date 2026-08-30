# CodeMentor AI

CodeMentor AI is a simple AI-powered coding assistant that helps users understand and analyze programming code using Google's Gemini API.

# Features

- Explain code and programming problems
- Find and explain bugs
- Analyze time and space complexity
- Simple and beginner-friendly interface

# Tech Stack

- Next.js
- React.js
- JavaScript
- Google Gemini API
- Tailwind CSS

# How to Run

1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL
cd CodeMentor-AI

2. Install dependencies

npm install

3. Add Gemini API key

Create a ".env.local" file:

GEMINI_API_KEY=your_api_key_here

4. Start the development server

npm run dev

Open:

http://localhost:3000

# How It Works

The user enters code or a programming problem and selects an option such as Explain, Debug, or Complexity.

The request is sent to a Next.js API route, which communicates with the Gemini API and returns the AI-generated response to the frontend.
