"use client";

import React, { useState, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const TypingIndicator = () => {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <span>Bot is typing{dots}</span>;
};

const suggestedQuestions = [
  "How can I improve my mood?",
  "What should I do if I'm stressed?",
  "Can you give me some relaxation tips?",
  "How does MindMate work?",
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: "user", text: input.trim() };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  const handleSuggestedClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  p-6 gap-8">
      {/* Side Panel */}
      <aside className="hidden md:flex flex-col w-1/3 max-w-sm bg-indigo-50 rounded-3xl shadow-xl p-6 border border-indigo-300 text-indigo-800">
        <h2 className="text-2xl font-semibold mb-4">Welcome to MindMate!</h2>
        <p className="mb-6 leading-relaxed">
          I am here to help you with your mental wellness journey. You can ask
          me about mood tips, stress management, or anything on your mind.
        </p>
        <h3 className="font-semibold mb-3">Try asking me:</h3>
        <ul className="space-y-3">
          {suggestedQuestions.map((q, i) => (
            <li
              key={i}
              onClick={() => handleSuggestedClick(q)}
              className="cursor-pointer rounded-lg bg-indigo-100 hover:bg-indigo-200 px-4 py-2 transition select-none"
              title="Click to add to input"
            >
              {q}
            </li>
          ))}
        </ul>
        <footer className="mt-auto text-sm text-indigo-600 mt-8 italic">
          Stay positive & take care!
        </footer>
      </aside>

      {/* Chatbot Container */}
      <div className="flex flex-col w-full md:w-2/3 max-w-md bg-white rounded-3xl shadow-xl border border-indigo-300">
        <header className="px-6 py-4 border-b border-indigo-200 text-indigo-700 font-semibold text-xl select-none rounded-t-3xl bg-indigo-50">
          MindMate Chatbot
        </header>

        <main
          className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100"
          style={{ minHeight: 320 }}
        >
          {messages.length === 0 && !loading && (
            <p className="text-indigo-400 italic text-center">
              Start chatting by typing a message below...
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm leading-snug shadow-md
                  ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-indigo-100 text-indigo-900 rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-indigo-600 italic text-sm animate-pulse">
              <TypingIndicator />
            </div>
          )}
        </main>

        <footer className="p-4 border-t border-indigo-200 rounded-b-3xl bg-indigo-50 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1 rounded-full border border-indigo-300 px-5 py-3 text-sm text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white rounded-full px-6 py-3 text-sm font-semibold transition-shadow shadow-md"
          >
            Send
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Chatbot;
