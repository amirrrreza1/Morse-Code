"use client";

import { useState } from "react";

type Mode = "morse-to-text" | "text-to-morse" | "mixed";

interface Props {
  onStart: (settings: { mode: Mode }) => void;
}

const modes: { label: string; value: Mode }[] = [
  { label: "Morse → Text", value: "morse-to-text" },
  { label: "Text → Morse", value: "text-to-morse" },
  { label: "Mixed", value: "mixed" },
];

export default function QuizConfig({ onStart }: Props) {
  const [mode, setMode] = useState<Mode>("morse-to-text");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-3xl font-extrabold text-center">
          Choose Quiz Mode
        </h2>

        <div className="space-y-3">
          {modes.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              className={`w-full py-3 px-4 text-lg font-medium border transition 
                ${
                  mode === value
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-400 hover:bg-gray-100"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => onStart({ mode })}
          className="w-full text-lg bg-black text-white font-bold py-3 hover:scale-105 transition active:scale-100"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
