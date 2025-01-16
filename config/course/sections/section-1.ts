import { Level, Section } from "../types";

const Level0: Level = [
  [
    //Lesson 1
    { type: "letter", expected: "A" },
    {
      type: "convert-from",
      expected: "A",
    },
    { type: "letter", expected: "T" },
    {
      type: "convert-from",
      expected: "T",
    },
    {
      type: "convert-to",
      expected: "AT",
    },
  ],
  [
    //Lesson 2
    { type: "letter", expected: "E" },
    {
      type: "convert-from",
      expected: "E",
    },
    {
      type: "convert-from",
      expected: "ATE",
    },
    {
      type: "convert-to",
      expected: "ATE",
    },
    {
      type: "match",
      expected: ["ate", "tea", "eat", "ETA"],
    },
  ],
  [
    //Lesson 3
    { type: "letter", expected: "H" },
    {
      type: "convert-from",
      expected: "H",
    },
    {
      type: "convert-from",
      expected: "THE",
    },
    {
      type: "convert-to",
      expected: "ATE",
    },
    {
      type: "match",
      expected: ["hate", "ate", "the", "eat", "heat"],
    },
  ],
  [
    //Lesson 4
    { type: "letter", expected: "N" },
    {
      type: "convert-from",
      expected: "N",
    },
    { type: "letter", expected: "I" },
    {
      type: "convert-from",
      expected: "I",
    },
    {
      type: "convert-from",
      expected: "NINE",
    },
    { type: "letter", expected: "M" },
    {
      type: "convert-from",
      expected: "M",
    },
    {
      type: "convert-from",
      expected: "MINE",
    },
    {
      type: "convert-to",
      expected: "MINE",
    },
  ],
  [
    //Lesson 5
    { type: "letter", expected: "A" },
    { type: "letter", expected: "N" },
    {
      type: "convert-from",
      expected: "EAT",
    },
    {
      type: "convert-to",
      expected: "time",
    },
    {
      type: "match",
      expected: ["mine", "ate", "the", "nine", "heat"],
    },
    {
      type: "match",
      expected: ["hate", "eta", "tea", "time", "at"],
    },
  ],
];

// A   E  HI   MN     T
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
const level1: Level = [
  [
    //Lesson 1 (Learn S and O)
    { type: "letter", expected: "S" },
    {
      type: "convert-from",
      expected: "S",
    },
    { type: "letter", expected: "O" },
    {
      type: "convert-from",
      expected: "O",
    },
    {
      type: "convert-to",
      expected: "SOS",
    },
  ],
  [
    //Lesson 2 (Learn R)
    {
      type: "letter",
      expected: "M",
    },
    {
      type: "convert-from",
      expected: "STEAM",
    },
    {
      type: "letter",
      expected: "R",
    },
    {
      type: "convert-from",
      expected: "R",
    },
    {
      type: "convert-to",
      expected: "ROAST",
    },
  ],
  [
    // Lesson 4 (Learn W and G)
    { type: "letter", expected: "W" },
    {
      type: "convert-from",
      expected: "W",
    },
    { type: "letter", expected: "G" },
    {
      type: "convert-from",
      expected: "G",
    },
    {
      type: "convert-to",
      expected: "GROW",
    },
  ],
  [
    // Lesson 5 (Recap)
    {
      type: "convert-from",
      expected: "GROW",
    },
    {
      type: "choice",
      expected: "A",
      choices: ["W", "A", "N", "E"],
    },
    {
      type: "convert-to",
      expected: "SOS",
    },
    {
      type: "match",
      expected: ["grow", "sos", "roast", "steam", "eat"],
    },
  ],
];

// A   E GHI   MNO  RST  W
// ABCDEFGHIJKLMNOPQRSTUVWXYZ

const level2: Level = [
  [
    // Lesson 1 (Learn D)
    { type: "letter", expected: "D" },
    {
      type: "convert-from",
      expected: "D",
    },
    {
      type: "convert-from",
      expected: "W",
    },
    {
      type: "convert-to",
      expected: "DAD",
    },
    {
      type: "convert-to",
      expected: "WON",
    },
  ],
  [
    // Lesson 2 (Learn U and K)
    { type: "letter", expected: "U" },
    {
      type: "convert-from",
      expected: "U",
    },
    { type: "letter", expected: "K" },
    {
      type: "convert-from",
      expected: "K",
    },
    {
      type: "convert-to",
      expected: "DUKE",
    },
  ],
  [
    // Lesson 3 (Learn b)
    {
      type: "match",
      expected: ["duke", "won", "dad", "grow", "heat"],
    },
    {
      type: "letter",
      expected: "B",
    },
    {
      type: "convert-to",
      expected: "B",
    },
    {
      type: "convert-to",
      expected: "bat",
    },
    {
      type: "match",
      expected: ["grow", "bat", "roast", "steam", "bot"],
    },
  ],
  [
    // Lesson 4 (listen round)
    {
      type: "choice",
      expected: "W",
      choices: ["W", "K", "I", "B"],
    },
    {
      type: "choice",
      expected: "I",
      choices: ["I", "W", "K", "B"],
    },
    {
      type: "choice",
      expected: "K",
      choices: ["K", "B", "I", "W"],
    },
    {
      type: "choice",
      expected: "B",
      choices: ["W", "B", "I", "K"],
    },
    {
      type: "match",
      expected: ["throw", "SOS", "toast", "steam", "bot"],
    },
  ],
  [
    // Lesson 5 (Recap)
    {
      type: "match",
      expected: ["duke", "won", "dad", "grow", "heat"],
    },
    {
      type: "match",
      expected: ["grow", "bat", "roast", "steam", "bot"],
    },
    {
      type: "convert-from",
      expected: "DUKE",
    },
    {
      type: "convert-to",
      expected: "bot",
    },
    {
      type: "match",
      expected: ["mine", "ate", "the", "nine", "heat"],
    },
  ],
];

// AB DE GHI K MNO  RSTU W
// ABCDEFGHIJKLMNOPQRSTUVWXYZ

const level3: Level = [
  [
    // Lesson 1 (Learn L and f)
    { type: "letter", expected: "L" },
    {
      type: "convert-from",
      expected: "L",
    },
    { type: "letter", expected: "F" },
    {
      type: "convert-from",
      expected: "F",
    },
    {
      type: "convert-to",
      expected: "FALL",
    },
  ],
  [
    // Small recap / continue
    {
      type: "convert-from",
      expected: "FALL",
    },
    {
      type: "convert-to",
      expected: "bot",
    },
    {
      type: "match",
      expected: ["fall", "bot", "dad", "false", "mine"],
    },
    {
      type: "choice",
      expected: "F",
      choices: ["B", "L", "F", "K"],
    },
    {
      type: "choice",
      expected: "L",
      choices: ["B", "L", "F", "K"],
    },
  ],
  [
    // Lesson 3 (Learn P and Y)
    { type: "letter", expected: "P" },
    {
      type: "convert-from",
      expected: "P",
    },
    { type: "letter", expected: "Y" },
    {
      type: "convert-from",
      expected: "Y",
    },
    {
      type: "convert-to",
      expected: "PLAY",
    },
  ],
  [
    // Lesson 4 (Learn Q)
    { type: "letter", expected: "Q" },
    {
      type: "convert-from",
      expected: "Q",
    },
    {
      type: "convert-to",
      expected: "Q",
    },
    {
      type: "convert-to",
      expected: "Q",
    },
  ],
  [
    // Lesson 5 (Recap)
    {
      type: "match",
      expected: ["fall", "bot", "heat", "help", "same"],
    },
    {
      type: "match",
      expected: ["play", "bat", "roast", "steam", "bot"],
    },
    {
      type: "convert-from",
      expected: "PLAY",
    },
    {
      type: "convert-to",
      expected: "bot",
    },
    {
      type: "match",
      expected: ["mine", "help", "there", "nine", "heat"],
    },
  ],
];

const level4: Level = [
  [
    // Lesson 1 (Learn J and Z)
    { type: "letter", expected: "J" },
    {
      type: "convert-from",
      expected: "J",
    },
    { type: "letter", expected: "Z" },
    {
      type: "convert-from",
      expected: "Z",
    },
    {
      type: "convert-to",
      expected: "JAZZ",
    },
  ],
  [
    // Lesson 2 (Learn V)
    { type: "letter", expected: "V" },
    {
      type: "convert-from",
      expected: "V",
    },
    {
      type: "convert-to",
      expected: "V",
    },
    {
      type: "convert-from",
      expected: "U",
    },
    {
      type: "convert-to",
      expected: "VALUE",
    },
  ],
];

// AB DEFGHI KLMNOP RSTU W Y
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
const section: Section = [Level0, level1, level2, level3, level4];

export default section;
