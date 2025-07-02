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
          className={`px-4 py-2 rounded ${
            mode === m ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
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
