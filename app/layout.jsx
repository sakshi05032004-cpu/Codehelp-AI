import "./globals.css";

export const metadata = {
  title: "CodeMentor AI",
  description: "Simple AI-powered coding assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
