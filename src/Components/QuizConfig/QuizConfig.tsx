"use client";

import { DifficultyOption } from "@/Lib/quizWords";
import { useState } from "react";

type Props = {
  onStart: (settings: {
    mode: "morse-to-text" | "text-to-morse" | "mixed";
    difficulty: "easy" | "medium" | "hard" | "random";
  }) => void;
};

const QuizConfig = ({ onStart }: Props) => {
  const [mode, setMode] = useState<"morse-to-text" | "text-to-morse" | "mixed">(
    "morse-to-text"
  );
  const [difficulty, setDifficulty] = useState<DifficultyOption>("easy");

  return (
    <div className="flex flex-col gap-4 items-start max-w-md mx-auto">
      <h2 className="text-xl font-bold">تنظیمات آزمون</h2>

      <div>
        <p className="font-semibold mb-1">نوع آزمون:</p>
        <select
          className="border rounded p-2 w-full"
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
        >
          <option value="morse-to-text">Morse → Text</option>
          <option value="text-to-morse">Text → Morse</option>
          <option value="mixed">ترکیبی</option>
        </select>
      </div>

      <div>
        <p className="font-semibold mb-1">سطح سختی:</p>
        <select
          className="border rounded p-2 w-full"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as DifficultyOption)}
        >
          <option value="easy">آسان</option>
          <option value="medium">متوسط</option>
          <option value="hard">سخت</option>
          <option value="random">تصادفی</option>
        </select>
      </div>

      <button
        onClick={() => onStart({ mode, difficulty })}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        شروع آزمون
      </button>
    </div>
  );
};

export default QuizConfig;
