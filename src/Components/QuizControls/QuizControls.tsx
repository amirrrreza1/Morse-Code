"use client";

import { Difficulty } from "@/Lib/quizWords";

type Props = {
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  mode: "morse-to-text" | "text-to-morse" | "mixed";
  setMode: (m: "morse-to-text" | "text-to-morse" | "mixed") => void;
};

const QuizControls = ({ difficulty, setDifficulty, mode, setMode }: Props) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2">
        {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
          <button
            key={level}
            className={`px-3 py-1 rounded ${
              difficulty === level ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {(["morse-to-text", "text-to-morse", "mixed"] as const).map((m) => (
          <button
            key={m}
            className={`px-3 py-1 rounded ${
              mode === m ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode(m)}
          >
            {m.replace(/-/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizControls;
