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
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-10 h-10 bg-black text-white text-2xl flex items-center justify-center shadow-md hover:scale-105 transition"
        title="Open Cheat Sheet"
      >
        !
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-[95%] h-full max-w-md max-h-[80vh] flex flex-col bg-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-1 right-3 text-gray-500 hover:text-black text-2xl z-10"
              title="Close"
            >
              ×
            </button>

            <div className="overflow-y-auto text-center">
              <h2 className="sticky top-0 bg-white p-3 border-b shadow text-2xl font-bold text-gray-800 mb-4">
                Cheat Sheet
              </h2>

              <section className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">
                  Letters and Numbers
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-lg font-mono text-gray-800 justify-items-center">
                  {charList.map(({ char, morse }) => (
                    <div
                      key={char + morse}
                      className="flex justify-between gap-4 border-b border-gray-200 pb-1 w-full max-w-[180px]"
                    >
                      <span className="w-1/2 text-right">{char}</span>
                      <span className="w-1/2 text-left text-gray-600">
                        {morse}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">
                  Special Words
                </h3>
                <div className="space-y-2 text-lg text-gray-800">
                  {wordList.map(({ word, morse }) => (
                    <div
                      key={word + morse}
                      className="flex justify-between gap-4 border-b border-gray-200 pb-1 max-w-[300px] mx-auto"
                    >
                      <span className="w-1/4 text-center">{word}</span>
                      <span className="w-3/4 text-center text-gray-600">
                        {morse}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheatSheetModal;
