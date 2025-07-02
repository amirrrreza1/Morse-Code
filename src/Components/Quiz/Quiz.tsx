"use client";

import { useEffect, useState } from "react";
import { quizWordList, Difficulty, DifficultyOption } from "@/Lib/quizWords";
import { charToMorse } from "@/Lib/morseMap";
import QuizConfig from "../QuizConfig/QuizConfig";
import MorseInput from "../MorseInput/MorseInput";

type Mode = "morse-to-text" | "text-to-morse" | "mixed";

type Question = {
  word: string;
  prompt: string; // چیزی که به کاربر نمایش می‌دهیم
  expected: string; // پاسخی که باید وارد کند
};

export default function Quiz() {
  /* ---------- state ---------- */
  const [step, setStep] = useState<"config" | "quiz" | "result">("config");
  const [config, setConfig] = useState<{
    mode: Mode;
    difficulty: DifficultyOption;
  } | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);

  /* پاسخ‌های کاربر */
  const [textAnswer, setTextAnswer] = useState(""); // وقتی انتظار متن است
  const [morseAnswer, setMorseAnswer] = useState(""); // وقتی انتظار مورس است

  /* ---------- helpers ---------- */
  const isMorseString = (str: string) => /^[.\- ]+$/.test(str);

  // Quiz.tsx
  const buildQuiz = ({
    mode,
    difficulty,
  }: {
    mode: Mode;
    difficulty: DifficultyOption;
  }) => {
    const pool =
      difficulty === "random"
        ? Object.values(quizWordList).flat()
        : quizWordList[difficulty as keyof typeof quizWordList];

    const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);

    /* 2) ساخت سؤال‌ها */
    const qs: Question[] = selected.map((word) => {
      const actualMode: Mode =
        mode === "mixed"
          ? Math.random() > 0.5
            ? "text-to-morse"
            : "morse-to-text"
          : mode;

      if (actualMode === "text-to-morse") {
        return {
          word,
          prompt: word,
          expected: word
            .split("")
            .map((c) => charToMorse[c.toUpperCase()] || "")
            .join(" "),
        };
      } else {
        return {
          word,
          prompt: word
            .split("")
            .map((c) => charToMorse[c.toUpperCase()] || "")
            .join(" "),
          expected: word.toUpperCase(),
        };
      }
    });

    setQuestions(qs);
    setIdx(0);
    setScore(0);
    setTextAnswer("");
    setMorseAnswer("");
    setConfig({ mode, difficulty });
    setStep("quiz");
  };

  /* ---------- رویداد ارسال ---------- */
  const handleSubmit = () => {
    const q = questions[idx];
    const user = isMorseString(q.expected)
      ? morseAnswer.trim()
      : textAnswer.trim().toUpperCase();

    if (user === q.expected.toUpperCase()) setScore((p) => p + 1);

    setTextAnswer("");
    setMorseAnswer("");

    if (idx + 1 < questions.length) setIdx((i) => i + 1);
    else setStep("result");
  };

  /* ---------- UI ---------- */
  if (step === "config") return <QuizConfig onStart={buildQuiz} />;

  if (step === "result")
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">نتیجه آزمون</h2>
        <p>
          امتیاز شما: {score} از {questions.length}
        </p>
        <button
          onClick={() => setStep("config")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          شروع مجدد
        </button>
      </div>
    );

  /* ---------- مرحله Quiz ---------- */
  const q = questions[idx];
  const expectMorse = isMorseString(q.expected); // حالا دقیق!

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="font-bold">
        سؤال {idx + 1} از {questions.length}
      </h2>

      <div className="bg-gray-100 text-lg font-mono p-4 rounded text-center">
        {q.prompt}
      </div>

      {expectMorse ? (
        /* ===== ورودی مورس ===== */
        <div className="space-y-2 text-center">
          <p className="text-gray-600">
            با <kbd className="px-1 bg-gray-300 rounded">Space</kbd> دات/دش بزن.
            <br />
            برای ثبت پاسخ <kbd className="px-1 bg-gray-300 rounded">
              Enter
            </kbd>{" "}
            بزن.
          </p>

          {/* استفاده از همان کامپوننت قبلی (captureOnly = true) */}
          <MorseInput
            value={morseAnswer}
            onChange={setMorseAnswer}
            translate={false}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ثبت پاسخ
          </button>
        </div>
      ) : (
        /* ===== ورودی متن ===== */
        <div className="space-y-2">
          <input
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="پاسخ را وارد کنید"
            className="border p-2 rounded w-full text-lg text-center"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            ثبت پاسخ
          </button>
        </div>
      )}
    </div>
  );
}
