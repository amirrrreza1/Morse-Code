export const morseToChar: Record<string, string> = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
};

export const charToMorse: Record<string, string> = Object.entries(
  morseToChar
).reduce((acc, [morse, char]) => {
  acc[char] = morse;
  return acc;
}, {} as Record<string, string>);

export const morseWords: Record<string, string> = {
  "...---...": "SOS",
  ".... . .-.. .--.": "HELP",
  "--- -.-": "OK",
};
