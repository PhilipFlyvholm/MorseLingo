"use client";

import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { Textarea } from "@nextui-org/input";
import { useMemo, useState } from "react";

import { InputButton } from "../buttons/InputButton";

import { convertToMorse, dahSound, ditSound } from "@/config/morse";
import { useAudio } from "@/components/hooks/Audio";

type ConvertExerciseProps = {
  expected: string;
};

export default function ConvertExercise({ expected }: ConvertExerciseProps) {
  const [text, setText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const ditAudio = useAudio(`data:audio/wav;base64,${ditSound}`, {});
  const dahAudio = useAudio(`data:audio/wav;base64,${dahSound}`, {});
  const handleButtonPress = (type: "dit" | "dah") => {
    if (index >= expected.length) return;
    const newText = (text + (type === "dit" ? "." : "-")).split(" ");
    const expectedLetter = expected[index];
    const expectedMorseLetter = convertToMorse(expectedLetter);

    if (newText[newText.length - 1] == expectedMorseLetter) {
      let nextIndex = index + 1;

      if (nextIndex < expected.length) {
        let nextExpected = convertToMorse(expected[nextIndex]);

        while (
          nextExpected.trim() == "" ||
          (nextExpected == "/" && nextIndex + 1 < expected.length)
        ) {
          if (nextExpected == "/") newText.push("/");
          nextIndex++;
          nextExpected = convertToMorse(expected[nextIndex]);
        }
      }

      setIndex(nextIndex);
      newText.push("");
    }
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

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <h3 className="font-semibold text-foreground/90">Convert this word:</h3>
      <div className="flex gap-2 items-center">
        <Image
          alt="MorseLingo Logo"
          className="-scale-x-100"
          height={75 * 1.2051948052}
          src={"/Mascot_transparent.webp"}
          width={75}
        />
        <Card>
          <CardBody className="flex items-center justify-center px-5">
            <p>
              {expected.split("").map((s, i) =>
                i == index ? (
                  <span key={i} className="font-bold">
                    {s}
                  </span>
                ) : (
                  s
                ),
              )}
            </p>
          </CardBody>
        </Card>
      </div>
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
    </div>
  );
}
