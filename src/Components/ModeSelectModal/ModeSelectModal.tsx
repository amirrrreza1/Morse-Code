"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  setMode: Dispatch<SetStateAction<"touch" | "manual" | null>>;
};

export default function ModeSelectModal({ setMode }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 w-80 text-center space-y-4">
        <h2 className="text-xl font-bold font-mono">Choose Mode</h2>
        <button onClick={() => setMode("touch")} className="ModeSelectorBTN">
          Touch / Space
        </button>
        <button onClick={() => setMode("manual")} className="ModeSelectorBTN">
          Manual
        </button>
      </div>
    </div>
  );
}
