import { Level, Section } from "../types";

const Level0: Level = [
  [
    //Lesson 1
    { type: "choice", expected: "A", choices: ["A", "B", "C", "D"] },
  ],
];

// A   E  HI   MNO  RST
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
const section: Section = [Level0];

export default section;
