import { SVGProps } from "react";

import { ConvertToExerciseData } from "@/components/exercises/convert-to-exercise";
import { ConvertFromExerciseData } from "@/components/exercises/convert-from-exercise";
import { LetterExerciseData } from "@/components/exercises/letter-exercise";
import { ChoiceExerciseData } from "@/components/exercises/choice-exercise";
import { MatchExerciseData } from "@/components/exercises/match-exercise";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface BaseExerciseData {
  type: "convert-to" | "convert-from" | "match" | "letter" | "choice";
}

export type ExerciseData =
  | ConvertToExerciseData
  | ConvertFromExerciseData
  | MatchExerciseData
  | LetterExerciseData
  | ChoiceExerciseData;

export type ExerciseWrapperProps<T extends ExerciseData> = {
  onComplete: () => void;
} & T;

export type LessonStorageData = {
  [key: string]: {
    //Section-Level-lesson
    completedLevels: number;
  };
};
