"use client";

import { useEffect, useState } from "react";
import { quizWordList, Difficulty } from "@/Lib/quizWords";
import { charToMorse, morseToChar } from "@/Lib/morseMap";
import QuizControls from "../QuizControls/QuizControls";

type Mode = "morse-to-text" | "text-to-morse" | "mixed";

const Quiz = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<Mode>("morse-to-text");

  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  // generate random question
  const generateQuestion = () => {
    const words = [
      ...quizWordList.easy,
      ...quizWordList.medium,
      ...quizWordList.hard,
    ];

    const list =
      difficulty === "easy"
        ? quizWordList.easy
        : difficulty === "medium"
        ? quizWordList.medium
        : quizWordList.hard;

    const mixed = [...list, ...words].sort(() => Math.random() - 0.5);
    const randomWord = mixed[Math.floor(Math.random() * mixed.length)];

    setQuestion(randomWord);
    setAnswer("");
    setIsCorrect(null);
  };

  useEffect(() => {
    generateQuestion();
  }, [difficulty, mode]);

  const convertToMorse = (text: string) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => charToMorse[char] || "?")
      .join(" ");
  };

  const checkAnswer = () => {
    const expected =
      mode === "morse-to-text" ? question : convertToMorse(question);

    const userAnswer = answer.trim().toUpperCase();
    const correct = expected.trim().toUpperCase() === userAnswer;

    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);

    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };

  const displayQuestion =
    mode === "morse-to-text" ? convertToMorse(question) : question;

  return (
    <div className="flex flex-col items-center gap-6">
      <QuizControls
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        mode={mode}
        setMode={setMode}
      />

      <div className="text-xl">
        Score: <span className="font-bold">{score}</span>
      </div>

      <div className="bg-gray-100 p-4 rounded shadow text-center min-w-[300px]">
        <div className="mb-2 text-gray-600">سوال:</div>
        <div className="text-2xl font-mono break-words">{displayQuestion}</div>
      </div>

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="پاسخ شما"
        className="p-2 border rounded w-72 text-center"
      />

      <button
        onClick={checkAnswer}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        بررسی پاسخ
      </button>

      {isCorrect !== null && (
        <div
          className={`text-xl ${isCorrect ? "text-green-600" : "text-red-600"}`}
        >
          {isCorrect ? "درست بود!" : "اشتباه بود!"}
        </div>
      )}
    </div>
  );
};

export default Quiz;
