import { SVGProps } from "react";

import { ConvertToExerciseData } from "@/components/exercises/convert-to-exercise";
import { ConvertFromExerciseData } from "@/components/exercises/convert-from-exercise";
import { LetterExerciseData } from "@/components/exercises/letter-exercise";
import { MatchExerciseData } from "@/components/exercises/match-exercise";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface BaseExerciseData {
  type: "convert-to" | "convert-from" | "match" | "letter";
}

export type ExerciseData =
  | ConvertToExerciseData
  | ConvertFromExerciseData
  | MatchExerciseData
  | LetterExerciseData;

export type ExerciseWrapperProps<T extends ExerciseData> = {
  onComplete: () => void;
} & T;
