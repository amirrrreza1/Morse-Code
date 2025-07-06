"use client";

import MorseInput from "@/Components/MorseInput/MorseInput";
import Quiz from "@/Components/Quiz/Quiz";
import TextInput from "@/Components/TextInput/TextInput";
import { useMode } from "@/Contex/ModeContext";
import { useState } from "react";

export default function Home() {
  const { mode } = useMode();

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-6">
      {mode === "morse" && <MorseInput translate />}
      {mode === "text" && <TextInput />}
      {mode === "quiz" && <Quiz />}
    </main>
  );
}
