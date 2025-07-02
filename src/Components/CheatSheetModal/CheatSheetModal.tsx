"use client";

import { useState } from "react";
import { morseToChar, morseWords } from "@/Lib/morseMap";

const CheatSheetModal = () => {
  const [open, setOpen] = useState(false);

  const charList = Object.entries(morseToChar).map(([morse, char]) => ({
    char,
    morse,
  }));

  const wordList = Object.entries(morseWords).map(([morse, word]) => ({
    word,
    morse,
  }));

  return (
    <>
      {/* Floating ! button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-black text-white rounded-full text-2xl flex items-center justify-center shadow-md hover:scale-105 transition"
        title="نمایش راهنما"
      >
        !
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-2xl font-bold text-gray-800">Cheat Sheet</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-black text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Character Section */}
            <section className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2 text-lg">
                حروف و اعداد
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-mono text-gray-800">
                {charList.map(({ char, morse }) => (
                  <div
                    key={char + morse}
                    className="flex justify-between border-b border-gray-200 pb-1"
                  >
                    <span>{char}</span>
                    <span className="text-gray-600">{morse}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Special Words Section */}
            <section>
              <h3 className="font-semibold text-gray-700 mb-2 text-lg">
                کلمات خاص
              </h3>
              <div className="space-y-2 text-sm font-mono text-gray-800">
                {wordList.map(({ word, morse }) => (
                  <div
                    key={word + morse}
                    className="flex justify-between border-b border-gray-200 pb-1"
                  >
                    <span>{word}</span>
                    <span className="text-gray-600">{morse}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default CheatSheetModal;
