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
];

// A   E  HI   MNO  RST
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
const section: Section = [Level0, level1];

export default section;
