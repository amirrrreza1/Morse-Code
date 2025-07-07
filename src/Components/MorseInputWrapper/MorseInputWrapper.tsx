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
          className="absolute bottom-4 left-4 text-sm px-3 py-1 border bg-black text-white border-black hover:bg-white hover:text-black transition"
          onContextMenu={(e) => e.preventDefault()}
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            WebkitTapHighlightColor: "transparent",
            touchAction: "none",
          }}
        >
          Change Mode
        </button>
      )}

      {mode === "touch" && <MorseTouchInput />}
      {mode === "manual" && <MorseManualInput />}
    </div>
  );
}
