"use client";

import { useEffect, useRef, useState } from "react";
import { morseToChar, morseWords } from "@/Lib/morseMap";
import { useToast } from "../Toast/Toast";

export default function MorseTouchInput() {
  const toast = useToast();

  const [current, setCurrent] = useState("");
  const currentRef = useRef("");
  const [output, setOutput] = useState<string[]>([]);

  const lastSignal = useRef(Date.now());
  const timer = useRef<NodeJS.Timeout | null>(null);
  const pressStart = useRef<number | null>(null);

  const pushSignal = (sig: "." | "-") => {
    const next = currentRef.current + sig;
    currentRef.current = next;
    setCurrent(next);
    lastSignal.current = Date.now();

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const str = currentRef.current;
      if (!str) return;

      if (morseWords[str]) setOutput((p) => [...p, morseWords[str]]);
      else if (morseToChar[str]) setOutput((p) => [...p, morseToChar[str]]);
      else toast("Invalid Morse Code!");

      if (Date.now() - lastSignal.current > 1600) setOutput((p) => [...p, " "]);

      currentRef.current = "";
      setCurrent("");
    }, 1500);
  };

  const deleteLastWord = () => {
    setOutput((prev) => {
      const copy = [...prev];
      while (copy.length && copy.at(-1) === " ") copy.pop();
      while (copy.length && copy.at(-1) !== " ") copy.pop();
      return copy;
    });
  };

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && pressStart.current == null) {
        e.preventDefault();
        pressStart.current = Date.now();
      }
      if (e.code === "Backspace") {
        e.preventDefault();
        deleteLastWord();
      }
    };

    const keyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && pressStart.current != null) {
        const dur = Date.now() - pressStart.current;
        pressStart.current = null;
        pushSignal(dur < 300 ? "." : "-");
      }
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  const handlePointerDown = () => (pressStart.current = Date.now());
  const handlePointerUp = () => {
    if (pressStart.current != null) {
      const dur = Date.now() - pressStart.current;
      pressStart.current = null;
      pushSignal(dur < 300 ? "." : "-");
    }
  };

  return (
    <div className="w-screen flex flex-col items-center gap-4 text-center">
      <div className="w-full font-mono text-lg text-gray-700 min-h-[1.5rem]">
        Morse:
        <div className="w-[95%] mx-auto text-2xl border min-h-[2.5rem] max-w-md flex items-center justify-center text-center px-2">
          {current ? (
            current
          ) : (
            <span
              className="text-gray-400 text-xl select-none"
              style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Hold Space or Press / Touch
            </span>
          )}
        </div>
      </div>

      <div className="w-[95%] text-3xl font-bold break-words min-h-[3.5rem] border p-2 max-w-md flex items-center justify-center text-center">
        {output.length ? (
          output.join("")
        ) : (
          <span
            className="text-gray-400 font-normal text-xl select-none"
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            No Words Yet
          </span>
        )}
      </div>

      <div className="w-[95%] max-w-md flex justify-end">
        <button
          onClick={deleteLastWord}
          onContextMenu={(e) => e.preventDefault()}
          className="px-4 py-1 bg-black text-white hover:scale-105 active:scale-100 transition duration-200 select-none"
          style={{
            touchAction: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          Delete
        </button>
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onContextMenu={(e) => e.preventDefault()}
        className="select-none sm:hidden w-30 h-20 bg-black text-white flex items-center justify-center text-xl active:scale-105 cursor-pointer transition shadow-lg"
        style={{
          touchAction: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        Hold
      </div>
    </div>
  );
}
