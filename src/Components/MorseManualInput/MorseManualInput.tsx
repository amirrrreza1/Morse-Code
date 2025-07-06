"use client";

import { useState, useEffect, useRef } from "react";
import { morseToChar, morseWords } from "@/Lib/morseMap";
import { useToast } from "../Toast/Toast";

type PasteState = "idle" | "success" | "error";

export default function MorseManualInput() {
  const toast = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [pasteState, setPasteState] = useState<PasteState>("idle");
  const hasShownError = useRef(false);

  useEffect(() => {
    const trimmed = input.trim();

    if (!trimmed) {
      setOutput("");
      hasShownError.current = false;
      return;
    }

    if (!/^[.\-\s]+$/.test(trimmed)) {
      setOutput("");
      if (!hasShownError.current) {
        toast("Only dot (.), dash (-), and space are allowed!");
        hasShownError.current = true;
      }
      return;
    }

    hasShownError.current = false;

    const tokens = trimmed.split(" ");
    const res: string[] = [];

    tokens.forEach((t) => {
      if (t === "") res.push(" ");
      else if (morseWords[t]) res.push(morseWords[t]);
      else if (morseToChar[t]) res.push(morseToChar[t]);
      else res.push("?");
    });

    setOutput(res.join(""));
  }, [input, toast]);

  const handlePaste = async () => {
    let state: PasteState = "idle";

    try {
      const clip = (await navigator.clipboard.readText()).trim();

      if (!clip) {
        state = "error";
        toast("Clipboard is empty ❌");
      } else if (!/^[.\-\s]+$/.test(clip)) {
        state = "error";
        toast("Invalid characters in clipboard ❌");
      } else {
        setInput(clip);
        state = "success";
        toast("Pasted from clipboard ✅");
      }
    } catch {
      state = "error";
      toast("Clipboard access failed ❌");
    }

    setPasteState(state);
    setTimeout(() => setPasteState("idle"), 2000);
  };

  const iconSrc =
    pasteState === "success"
      ? "/SVG/tick-icon.svg"
      : pasteState === "error"
      ? "/SVG/warning-icon.svg"
      : "/SVG/paste-icon.svg";

  return (
    <div className="flex flex-col items-center gap-4 text-center w-screen">
      <div className="flex items-center gap-2 w-[95%] max-w-xs mx-auto border border-black p-2">
        <input
          value={input}
          onChange={(e) => {
            const val = e.target.value;
            if (/^[.\-\s]*$/.test(val)) {
              setInput(val);
            } else if (!hasShownError.current) {
              toast("Only dot (.), dash (-), and space are allowed!");
              hasShownError.current = true;
            }
          }}
          placeholder="Write Morse here"
          className="flex-1 font-mono text-center outline-none"
        />

        <button
          onClick={handlePaste}
          className="w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <img src={iconSrc} alt="paste" className="w-6 h-6" />
        </button>
      </div>

      <div className="text-3xl font-bold font-mono break-words min-h-[2.5rem]">
        {output}
      </div>
    </div>
  );
}
