"use client";

import { useState } from "react";

type DifficultyOption = "easy" | "medium" | "hard" | "random";

type Props = {
  onStart: (settings: {
    mode: "morse-to-text" | "text-to-morse" | "mixed";
    difficulty: DifficultyOption;
  }) => void;
};

const QuizConfig = ({ onStart }: Props) => {
  const [mode, setMode] = useState<"morse-to-text" | "text-to-morse" | "mixed">(
    "morse-to-text"
  );
  const [difficulty, setDifficulty] = useState<DifficultyOption>("easy");

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-8">
          Quiz Settings
        </h2>

        <div className="mb-6">
          <label
            htmlFor="mode-select"
            className="block text-lg text-center font-semibold mb-2"
          >
            Choose Quiz Type:
          </label>
          <div className="relative">
            <select
              id="mode-select"
              className="block appearance-none w-full bg-neutral-700 border border-neutral-600 text-neutral-50 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-neutral-600 focus:border-neutral-500 transition-all duration-300 ease-in-out cursor-pointer"
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
            >
              <option value="morse-to-text">Morse → Text</option>
              <option value="text-to-morse">Text → Morse</option>
              <option value="mixed">Mixed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-300">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label
            htmlFor="difficulty-select"
            className="block text-center text-lg font-semibold mb-2"
          >
            Select Difficulty:
          </label>
          <div className="relative">
            <select
              id="difficulty-select"
              className="block appearance-none w-full bg-neutral-700 border border-neutral-600 text-neutral-50 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-neutral-600 focus:border-neutral-500 transition-all duration-300 ease-in-out cursor-pointer"
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as DifficultyOption)
              }
            >
              <option value="easy">Easy</option>
              <option value="medium">Normal</option>
              <option value="hard">Hard</option>
              <option value="random">Random</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-300">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={() => onStart({ mode, difficulty })}
          className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-neutral-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizConfig;
