"use client";

import { useMode } from "@/Contex/ModeContext";

const ModeSwitcher = () => {
  const { mode, setMode } = useMode();

  return (
    <div className="flex gap-2">
      {["morse", "text", "quiz"].map((m) => (
        <button
          key={m}
          onClick={() => setMode(m as any)}
          className={`${
            mode === m ? "bg-white text-black" : "bg-black text-white"
          } my-2 py-1 px-2 text-[14px]`}
        >
          {m === "morse"
            ? "Morse → Text"
            : m === "text"
            ? "Text → Morse"
            : "Quiz Mode"}
        </button>
      ))}
    </div>
  );
};

export default ModeSwitcher;
