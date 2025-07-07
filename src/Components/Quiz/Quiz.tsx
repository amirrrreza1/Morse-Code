"use client";

import { useState } from "react";
import { quizWordList } from "@/Lib/quizWords";
import { charToMorse } from "@/Lib/morseMap";
import QuizConfig from "../QuizConfig/QuizConfig";
import { useToast } from "../Toast/Toast";

type Mode = "morse-to-text" | "text-to-morse" | "mixed";
type Question = { prompt: string; expected: string };

export default function Quiz() {
  const toast = useToast();

  const [step, setStep] = useState<"config" | "quiz">("config");
  const [mode, setMode] = useState<Mode>("morse-to-text");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);

  const [textAns, setTextAns] = useState("");
  const [morseAns, setMorseAns] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const isMorse = (str: string) => /^[.\- ]+$/.test(str);

  const startQuiz = ({ mode }: { mode: Mode }) => {
    setMode(mode);

    const pool = [...quizWordList];
    const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);

    const qs: Question[] = selected.map((word) => {
      const currentMode =
        mode === "mixed"
          ? Math.random() > 0.5
            ? "text-to-morse"
            : "morse-to-text"
          : mode;

      return currentMode === "text-to-morse"
        ? {
            prompt: word,
            expected: word
              .toUpperCase()
              .split("")
              .map((c) => charToMorse[c] || "")
              .join(" "),
          }
        : {
            prompt: word
              .toUpperCase()
              .split("")
              .map((c) => charToMorse[c] || "")
              .join(" "),
            expected: word.toUpperCase(),
          };
    });

    setQuestions(qs);
    setIndex(0);
    setTextAns("");
    setMorseAns("");
    setFeedback(null);
    setStep("quiz");
  };

  const checkAnswer = () => {
    const q = questions[index];
    const user = isMorse(q.expected)
      ? morseAns.trim()
      : textAns.trim().toUpperCase();

    const correct = user === q.expected.toUpperCase();
    setFeedback(correct ? "correct" : "wrong");
    toast(correct ? "Correct" : "Wrong");

    setTimeout(() => {
      setTextAns("");
      setMorseAns("");
      setFeedback(null);
      setIndex((i) => (i + 1) % questions.length);
    }, 1500);
  };

  if (step === "config") return <QuizConfig onStart={startQuiz} />;

  const q = questions[index];
  const expectMorse = isMorse(q.expected);

  const inputBorder =
    feedback === "correct"
      ? "bg-green-600 text-white"
      : feedback === "wrong"
      ? "bg-red-600 text-white"
      : "border-black";

  return (
    <div className="w-[95%] space-y-6 max-w-md mx-auto">
      <div className="bg-white border border-black p-4 text-center font-mono">
        {q.prompt}
      </div>

      {expectMorse ? (
        <input
          value={morseAns}
          onChange={(e) => setMorseAns(e.target.value.replace(/[^.\- ]/g, ""))}
          placeholder="Enter - or ."
          className={`border ${inputBorder} p-2 w-full text-center`}
        />
      ) : (
        <input
          value={textAns}
          onChange={(e) => setTextAns(e.target.value)}
          placeholder="Enter answer"
          className={`border ${inputBorder} text-2xl p-2 w-full text-center`}
        />
      )}

      <div className="flex gap-4">
        <button onClick={checkAnswer} className="QuizAnswerBTN">
          Check
        </button>
        <button onClick={() => setStep("config")} className="QuizAnswerBTN">
          Exit
        </button>
      </div>
    </div>
  );
}
