"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import clsx from "clsx";

import { InputButton } from "../buttons/InputButton";
import PlayMorse from "../PlayMorse";

import { BaseExerciseData, ExerciseWrapperProps } from "@/types";
export interface ChoiceExerciseData extends BaseExerciseData {
  type: "choice";
  expected: string;
  choices: string[];
}

type ChoiceExerciseProps = ExerciseWrapperProps<ChoiceExerciseData>;

const LetterExercise: React.FC<ChoiceExerciseProps> = ({
  expected,
  choices,
  onComplete,
}: ChoiceExerciseProps) => {
  const [selected, setSelected] = useState<string>("");

  function handleSubmit() {
    if (selected == expected) {
      onComplete();
    } else {
      alert("Incorrect!");
    }
  }

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <div className="flex flex-row items-center justify-center mb-5">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-foreground/90 px-5">
              What do you hear?
            </h3>
          </CardHeader>

          <Divider />
          <CardBody className="flex flex-row items-center justify-center gap-3 px-2 py-5">
            <PlayMorse text={expected} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-2 grid-rows-2">
        {choices.map((value, i) => (
          <InputButton
            key={i}
            buttonKey={(i + 1).toString()}
            className={clsx(
              "font-bold uppercase m-1 aspect-square max-w-40 w-full h-auto text-lg",
              i % 2 == 0 ? "place-self-end" : "place-self-start",
            )}
            color={selected == value ? "secondary" : "secondary"}
            variant={selected == value ? "solid" : "flat"}
            onPress={() => setSelected(value)}
          >
            {value}
          </InputButton>
        ))}
      </div>
      <div className="flex my-5">
        <InputButton
          buttonKey="Enter"
          className="font-bold uppercase text-white w-full"
          color={selected.length == 0 ? "default" : "success"}
          disabled={selected.length == 0}
          onPress={() => handleSubmit()}
        >
          Check
        </InputButton>
      </div>
    </div>
  );
};

export default LetterExercise;
