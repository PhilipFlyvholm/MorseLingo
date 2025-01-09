import { Level, Section } from "../types";

import { ConvertFromExerciseData } from "@/components/exercises/convert-from-exercise";
import { ConvertToExerciseData } from "@/components/exercises/convert-to-exercise";
import { LetterExerciseData } from "@/components/exercises/letter-exercise";
import { MatchExerciseData } from "@/components/exercises/match-exercise";

const Level0: Level = [
  [
    { type: "convert-to", expected: "Hallo" } as ConvertToExerciseData,
    {
      type: "convert-from",
      expected: "Hallo",
    } as ConvertFromExerciseData,
    {
      type: "match",
      expected: ["Hallo", "ate", "tea", "sos", "hot"],
    } as MatchExerciseData,
    { type: "letter", expected: "E" } as LetterExerciseData,
  ],
  [{ type: "letter", expected: "E" } as LetterExerciseData],
];

const section: Section = [Level0, Level0, Level0];

export default section;
