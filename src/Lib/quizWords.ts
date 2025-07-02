export type Difficulty = "easy" | "medium" | "hard";

export const quizWordList: Record<Difficulty, string[]> = {
  easy: ["SOS", "HI", "OK", "YES", "NO"],
  medium: ["HELLO", "WORLD", "MORSE", "CODE", "FAST"],
  hard: ["DEVELOPER", "ALGORITHM", "REACT", "NEXTJS", "LEARNING"],
};
