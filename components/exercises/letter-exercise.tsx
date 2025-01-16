"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { InputButton } from "../buttons/InputButton";
import { useAudio } from "../hooks/Audio";
import PlayMorse from "../PlayMorse";
import MorseInput from "../Input/MorseInput";

import { BaseExerciseData, ExerciseWrapperProps } from "@/types";
import { ditSound, dahSound, convertToMorse } from "@/config/morse";
export interface LetterExerciseData extends BaseExerciseData {
  type: "letter";
  expected: string;
}

type LetterExerciseProps = ExerciseWrapperProps<LetterExerciseData>;

const LetterExercise: React.FC<LetterExerciseProps> = ({
  expected,
  onComplete,
}: LetterExerciseProps) => {
  const [text, setText] = useState<string>("");
  const ditAudio = useAudio(`data:audio/wav;base64,${ditSound}`, {});
  const dahAudio = useAudio(`data:audio/wav;base64,${dahSound}`, {});

  const handleButtonPress = (type: "dit" | "dah") => {
    const newText = (text + (type === "dit" ? "." : "-")).split(" ");

    setText(newText.join(" "));
    if (type === "dit") ditAudio?.play();
    else dahAudio?.play();
  };

  const checkDelete = () => {
    if (text.length == 0 || text.trim() == "") return false;
    const splitText = text.split(" ");
    const last = splitText[splitText.length - 1];

    return last.length > 0;
  };
  const canDelete = useMemo<boolean>(checkDelete, [text]);
  const handleDelete = () => {
    if (!checkDelete()) return;
    setText(text.slice(0, -1));
  };

  function handleSubmit() {
    const expectedLetter = expected[0];
    const expectedMorseLetter = convertToMorse(expectedLetter);

    if (text == expectedMorseLetter) {
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
              Convert this letter:
            </h3>
          </CardHeader>

          <Divider />
          <CardBody className="flex flex-row items-center justify-center gap-3 px-2 py-5">
            <h2 className="text-3xl font-bold uppercase text-center border-secondary-500 border-5 p-3 w-[4.5rem] h-[4.5rem] rounded-full aspect-square shadow-lg">
              {expected[0]}
            </h2>
            <div className="flex flex-col flex-wrap gap-1.5">
              <PlayMorse text={expected[0]} />
              <PlayMorse slow={true} text={expected} />
            </div>
          </CardBody>
        </Card>
      </div>
      <MorseInput
        canDelete={canDelete}
        handleButtonPress={handleButtonPress}
        handleDelete={handleDelete}
        text={text}
      />
      <div className="flex my-5">
        <InputButton
          buttonKey="Enter"
          className="font-bold uppercase text-white w-full"
          color={text.length == 0 ? "default" : "success"}
          disabled={text.length == 0}
          onPress={() => handleSubmit()}
        >
          Check
        </InputButton>
      </div>
    </div>
  );
};

export default LetterExercise;
