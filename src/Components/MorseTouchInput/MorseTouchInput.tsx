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
  const touchStart = useRef<number | null>(null);

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
      const withoutTrailingSpaces = [...prev];
      while (
        withoutTrailingSpaces.length &&
        withoutTrailingSpaces[withoutTrailingSpaces.length - 1] === " "
      ) {
        withoutTrailingSpaces.pop();
      }
      while (
        withoutTrailingSpaces.length &&
        withoutTrailingSpaces[withoutTrailingSpaces.length - 1] !== " "
      ) {
        withoutTrailingSpaces.pop();
      }
      return withoutTrailingSpaces;
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

  const handlePressStart = () => (touchStart.current = Date.now());
  const handlePressEnd = () => {
    if (touchStart.current != null) {
      const dur = Date.now() - touchStart.current;
      touchStart.current = null;
      pushSignal(dur < 300 ? "." : "-");
    }
  };

  return (
    <div className="w-screen flex flex-col items-center gap-4 text-center">
      <div className="w-full font-mono text-lg text-gray-700 min-h-[1.5rem]">
        Morse:
        <div className="w-[95%] mx-auto text-2xl border min-h-[2.5rem] max-w-md flex items-center justify-center text-center px-2">
          {current.length > 0 ? (
            current
          ) : (
            <span className="text-gray-400 text-xl">
              Hold Space or Click/Touch
            </span>
          )}
        </div>
      </div>

      <div className="w-[95%] text-3xl font-bold break-words min-h-[3.5rem] border p-2 max-w-md flex items-center justify-center text-center">
        {output.length > 0 ? (
          output.join("")
        ) : (
          <span className="text-gray-400 font-normal text-xl">
            No Words Yet
          </span>
        )}
      </div>

      <div className="w-[95%] max-w-md flex justify-end">
        <button
          onClick={deleteLastWord}
          className="px-4 py-1 bg-black text-white hover:scale-105 active:scale-100 transition duration-200"
        >
          Delete
        </button>
      </div>

      <div
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        className="sm:hidden w-30 h-20 rounded-full bg-black text-white flex items-center justify-center text-xl select-none active:scale-105 cursor-pointer transition shadow-lg"
      >
        Hold
      </div>
    </div>
  );
}
