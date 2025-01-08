"use client";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

import { convertToMorse } from "../../config/morse";

import { BaseExerciseData, ExerciseWrapperProps } from "@/types";
export interface MatchExerciseData extends BaseExerciseData {
  type: "match";
  expected: string[];
}

type ButtonColors =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

type MatchExerciseProps = ExerciseWrapperProps<MatchExerciseData>;
const MatchExercise: React.FC<MatchExerciseProps> = ({
  expected,
  onComplete,
}: MatchExerciseProps) => {
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ left?: string; right?: string }>(
    {},
  );
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ left?: string; right?: string }[]>([]);

  useEffect(() => {
    setShuffledWords(shuffleArray([...expected]));
  }, [expected]);

  function select(word: string, side: "left" | "right") {
    if (correctWords.includes(word)) return;
    const newSelected = { ...selected };

    if (side === "left") {
      newSelected.left = word;
    } else {
      newSelected.right = word;
    }
    if (newSelected.left && newSelected.right) {
      if (newSelected.left == newSelected.right) {
        setCorrectWords((v) => [...v, word]);
        if (correctWords.length + 1 == expected.length) {
          onComplete();
        }
      } else {
        const copy = { ...newSelected };

        setErrors((v) => [...v, copy]);
        setTimeout(() => {
          setErrors((v) => v.filter((error) => error !== copy));
        }, 1000);
      }
      newSelected.left = undefined;
      newSelected.right = undefined;
    }
    setSelected(newSelected);
  }
  function isError(word: string, side: "left" | "right") {
    return errors.some((error) => error[side] === word);
  }

  function getColor(word: string, side: "left" | "right"): ButtonColors {
    return correctWords.includes(word)
      ? "success"
      : isError(word, side)
        ? "danger"
        : selected[side] === word
          ? "primary"
          : undefined;
  }

  function getVariant(word: string, side: "left" | "right") {
    return correctWords.includes(word)
      ? "faded"
      : selected[side] === word
        ? "solid"
        : "ghost";
  }

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <h3 className="font-semibold text-foreground/90">
        Tap the matching pairs:
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-cols-1 gap-2">
          {expected.map((word) => (
            <Button
              key={word}
              color={getColor(word, "left")}
              isDisabled={correctWords.includes(word) || isError(word, "left")}
              radius={"sm"}
              variant={getVariant(word, "left")}
              onPress={() => select(word, "left")}
            >
              {word.toUpperCase()}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {shuffledWords.map((word) => (
            <Button
              key={word}
              color={getColor(word, "right")}
              isDisabled={correctWords.includes(word) || isError(word, "right")}
              radius={"sm"}
              variant={getVariant(word, "right")}
              onPress={() => select(word, "right")}
            >
              {convertToMorse(word)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchExercise;
