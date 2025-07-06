"use client";

import { useState, useEffect, useRef } from "react";
import { morseToChar, morseWords } from "@/Lib/morseMap";
import { useToast } from "../Toast/Toast";

export default function MorseManualInput() {
  const toast = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const hasShownError = useRef(false);

  useEffect(() => {
    const trimmed = input.trim();

    if (!trimmed) {
      setOutput("");
      hasShownError.current = false;
      return;
    }

    const isValid = /^[.\-\s]+$/.test(trimmed);

    if (!isValid) {
      setOutput("");
      if (!hasShownError.current) {
        toast("تنها نقطه، خط و فاصله مجاز هستند!");
        hasShownError.current = true;
      }
      return;
    }

    hasShownError.current = false;

    const tokens = trimmed.split(" ");
    const res: string[] = [];

    for (const tok of tokens) {
      if (tok === "") {
        res.push(" ");
      } else if (morseWords[tok]) {
        res.push(morseWords[tok]);
      } else if (morseToChar[tok]) {
        res.push(morseToChar[tok]);
      } else {
        res.push("?");
      }
    }

    setOutput(res.join(""));
  }, [input, toast]);

  return (
    <div className="flex flex-col items-center gap-4 text-center w-screen">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write Here"
        className="w-[95%] max-w-xs mx-auto p-2 border border-gray-300 rounded font-mono text-center"
      />

      <div className="text-3xl font-bold font-mono break-words">{output}</div>
    </div>
  );
}
