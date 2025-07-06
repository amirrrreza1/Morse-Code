"use client";

import { useEffect, useRef, useState } from "react";
import { morseToChar, morseWords } from "@/Lib/morseMap";

type Props = {
  value?: string;
  onChange?: (val: string) => void;
  translate?: boolean;
};

export default function MorseInput({
  value,
  onChange,
  translate = true,
}: Props) {
  /* ---------- حالت کنترل‌شده یا داخلی ---------- */
  const [internal, setInternal] = useState("");
  const morse = value !== undefined ? value : internal;
  const setMorse = onChange !== undefined ? onChange : setInternal;

  /* ---------- refs ---------- */
  const morseRef = useRef(morse);
  const pressStartRef = useRef<number | null>(null);
  const lastSignalRef = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ---------- states ---------- */
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState(false);

  /* همواره مقدار تازهٔ morse را در ref نگه دار */
  useEffect(() => {
    morseRef.current = morse;
  }, [morse]);

  /* ---------- Keyboard events ---------- */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" && pressStartRef.current === null) {
        e.preventDefault();
        pressStartRef.current = Date.now();
      }
    };

    const up = (e: KeyboardEvent) => {
      if (e.code === "Space" && pressStartRef.current !== null) {
        const duration = Date.now() - pressStartRef.current;
        const signal = duration < 300 ? "." : "-";
        pressStartRef.current = null;
        setMorse(morseRef.current + signal);
        lastSignalRef.current = Date.now();
        scheduleTranslate();
      }
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  /* ---------- Touch events ---------- */
  const touchRef = useRef<number | null>(null);

  const touchStart = () => {
    touchRef.current = Date.now();
  };

  const touchEnd = () => {
    if (touchRef.current !== null) {
      const dur = Date.now() - touchRef.current;
      const signal = dur < 300 ? "." : "-";
      touchRef.current = null;
      setMorse(morseRef.current + signal);
      lastSignalRef.current = Date.now();
      scheduleTranslate();
    }
  };

  /* ---------- ترجمه پس از مکث ---------- */
  const scheduleTranslate = () => {
    if (!translate) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const code = morseRef.current;
      if (!code) return;

      if (morseWords[code]) {
        setResult((p) => [...p, morseWords[code]]);
      } else if (morseToChar[code]) {
        setResult((p) => [...p, morseToChar[code]]);
      } else {
        /* --- کد نامعتبر --- */
        setError(true);
        setTimeout(() => setError(false), 1500);
        /* هیچ چیز به result افزوده نمی‌شود */
      }

      /* فاصلهٔ بزرگ → فاصلهٔ کلمه */
      if (Date.now() - lastSignalRef.current > 2000) {
        setResult((p) => [...p, " "]);
      }

      setMorse(""); // پاک‌کردن ورودی فعلی
    }, 1200);
  };

  /* ---------- UI ---------- */
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="text-lg font-mono text-gray-700">Morse: {morse}</div>

      {error && (
        <div className="text-red-600 text-sm font-semibold">
          کد مورس نامعتبر بود!
        </div>
      )}

      {translate && (
        <div className="text-3xl font-bold break-words max-w-xs">
          {result.join("")}
        </div>
      )}

      <div
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        className="w-48 h-48 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl select-none active:bg-blue-700 sm:hidden"
      >
        لمس برای مورس
      </div>
    </div>
  );
}
