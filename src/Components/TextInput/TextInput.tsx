"use client";

import { useState } from "react";

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

const TextInput = () => {
  const [text, setText] = useState("");

  const convertToMorse = (input: string) => {
    return input
      .toUpperCase()
      .split("")
      .map((char) => (char === " " ? "/" : charToMorse[char] || "?"))
      .join(" ");
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-md w-full">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        className="w-full p-2 border border-gray-300 rounded text-center text-xl"
      />

      <div className="text-xl font-mono break-words">
        Morse: {convertToMorse(text)}
      </div>
    </div>
  );
};

export default TextInput;
