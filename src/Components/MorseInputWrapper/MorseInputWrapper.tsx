"use client";

import { useState } from "react";
import ModeSelectModal from "../ModeSelectModal/ModeSelectModal";
import MorseTouchInput from "../MorseTouchInput/MorseTouchInput";
import MorseManualInput from "../MorseManualInput/MorseManualInput";

export default function MorseInputWrapper() {
  const [mode, setMode] = useState<"touch" | "manual" | null>(null);

  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-md mx-auto">
      {mode === null && <ModeSelectModal setMode={setMode} />}

      {mode !== null && (
        <button
          onClick={() => setMode(null)}
          className="absolute bottom-4 left-4 text-sm px-3 py-1 border border-black hover:bg-black hover:text-white transition"
        >
          Change Mode
        </button>
      )}

      {mode === "touch" && <MorseTouchInput />}
      {mode === "manual" && <MorseManualInput />}
    </div>
  );
}
