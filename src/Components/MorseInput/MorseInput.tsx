"use client";

import { useEffect, useRef, useState } from "react";
import { morseToChar, morseWords } from "@/Lib/morseMap";

const MorseInput = () => {
  const [morseCode, setMorseCode] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [pressStart, setPressStart] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSignalTime = useRef<number>(Date.now());

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && pressStart === null) {
        e.preventDefault();
        setPressStart(Date.now());
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && pressStart !== null) {
        const duration = Date.now() - pressStart;
        setPressStart(null);
        const signal = duration < 300 ? "." : "-";
        setMorseCode((prev) => prev + signal);
        lastSignalTime.current = Date.now();
        resetAfterPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressStart]);

  // Touch handling
  const touchStartRef = useRef<number | null>(null);

  const handleTouchStart = () => {
    touchStartRef.current = Date.now();
  };

  const handleTouchEnd = () => {
    if (touchStartRef.current !== null) {
      const duration = Date.now() - touchStartRef.current;
      const signal = duration < 300 ? "." : "-";
      setMorseCode((prev) => prev + signal);
      touchStartRef.current = null;
      lastSignalTime.current = Date.now();
      resetAfterPause();
    }
  };

  // Pause detection
  const resetAfterPause = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const now = Date.now();
      const timeDiff = now - lastSignalTime.current;

      if (morseWords[morseCode]) {
        // کامل مثل SOS
        setResult((prev) => [...prev, morseWords[morseCode]]);
      } else if (morseCode.length > 0) {
        const char = morseToChar[morseCode] || "?";
        setResult((prev) => [...prev, char]);
      }

      setMorseCode("");

      // اگر فاصله خیلی زیاد بود (مثلاً 2s)، کلمه جدید
      if (timeDiff > 2000) {
        setResult((prev) => [...prev, " "]);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-xl font-mono">Morse: {morseCode}</div>
      <div className="text-3xl font-bold break-words max-w-xs">
        Result: {result.join("")}
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-48 h-48 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl select-none active:bg-blue-700"
      >
        لمس برای مورس
      </div>
    </div>
  );
};

export default MorseInput;
