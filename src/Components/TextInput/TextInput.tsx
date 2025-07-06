"use client";

import { useState } from "react";
import { useToast } from "../Toast/Toast";

const charToMorse: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
};

type Status = "idle" | "copied" | "error";

const TextInput = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const Toast = useToast();

  const convertToMorse = (input: string) => {
    return input
      .toUpperCase()
      .split("")
      .map((char) => (char === " " ? " " : charToMorse[char] || "?"))
      .join("  ");
  };

  const morse = convertToMorse(text);

  const handleCopy = async () => {
    if (!text.trim()) {
      setStatus("error");
      Toast("Text Input is empty!");
    } else {
      await navigator.clipboard.writeText(morse);
      setStatus("copied");
      Toast("Morse Code Copied!");
    }
    setTimeout(() => setStatus("idle"), 2000);
  };

  const getIcon = () => {
    switch (status) {
      case "copied":
        return "/SVG/tick-icon.svg";
      case "error":
        return "/SVG/warning-icon.svg";
      default:
        return "/SVG/copy-icon.svg";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-md w-[95%] mx-auto">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
        className="w-full p-2 border font-mono border-gray-300 rounded text-center text-xl"
      />

      <div className="text-xl text-center font-mono break-words w-full">
        <div className="flex items-center justify-between w-full border p-2 rounded bg-gray-50">
          <p className="flex-1 text-2xl whitespace-pre-wrap break-words min-h-[2rem]">
            {morse}
          </p>

          <button
            onClick={handleCopy}
            className="flex-none w-10 h-10 flex items-center justify-center"
          >
            <img src={getIcon()} alt="Copy" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
