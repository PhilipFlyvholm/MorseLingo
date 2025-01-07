"use client";

import { Textarea } from "@nextui-org/input";
import { useMemo, useState } from "react";

import { InputButton } from "../buttons/InputButton";
import { useAudio } from "../hooks/Audio";
import PlayMorse from "../PlayMorse";

import { ditSound, dahSound, convertToMorse } from "@/config/morse";

type LetterExerciseProps = {
  expected: string;
};

export function LetterExercise({ expected }: LetterExerciseProps) {
  const [text, setText] = useState<string>("");
  const ditAudio = useAudio(`data:audio/wav;base64,${ditSound}`, {});
  const dahAudio = useAudio(`data:audio/wav;base64,${dahSound}`, {});

  const handleButtonPress = (type: "dit" | "dah") => {
    const newText = (text + (type === "dit" ? "." : "-")).split(" ");

    setText(newText.join(" "));
    if (type === "dit") ditAudio.play();
    else dahAudio.play();
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
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  }

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <h3 className="font-semibold text-foreground/90">Convert this letter:</h3>
      <div className="flex flex-col items-center mb-1">
        <h2 className="text-3xl font-bold uppercase text-center border-secondary-500 border-5 p-3 rounded-full aspect-square shadow-lg">
          {expected[0]}
        </h2>
      </div>
      <PlayMorse text={expected[0]} />
      <Textarea
        isReadOnly
        className="w-full"
        minRows={2}
        placeholder="Type in morse"
        value={text}
      />
      <div className="flex gap-1">
        <InputButton buttonKey="." onPress={() => handleButtonPress("dit")}>
          Dit (.)
        </InputButton>

        <InputButton buttonKey="-" onPress={() => handleButtonPress("dah")}>
          Dah (-)
        </InputButton>

        <InputButton
          buttonKey="Backspace"
          disabled={!canDelete}
          onPress={() => handleDelete()}
        >
          Back
        </InputButton>
      </div>
      <div className="flex my-5">
        <InputButton
          buttonKey="Enter"
          className="font-bold uppercase text-white"
          color={text.length == 0 ? "default" : "success"}
          disabled={text.length == 0}
          onPress={() => handleSubmit()}
        >
          Check
        </InputButton>
      </div>
    </div>
  );
}
