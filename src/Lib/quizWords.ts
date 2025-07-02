export const quizWordList = {
  easy: ["SOS", "HI", "OK"],
  medium: ["HELLO", "WORLD"],
  hard: ["MORSE", "CODE"],
} as const;

export type Difficulty = keyof typeof quizWordList;

export type DifficultyOption = Difficulty | "random";
