"use client";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { Textarea } from "@nextui-org/input";
import { Form } from "@nextui-org/form";
import { FormEvent, useState } from "react";
import { Button } from "@nextui-org/button";

import { convertToMorse } from "../../config/morse";
import PlayMorse from "../PlayMorse";

import { BaseExerciseData, ExerciseWrapperProps } from "@/types";
import clsx from "clsx";
import { DitSymbol, DahSymbol } from "../icons";
import MorseText from "../MorseText";
export interface ConvertFromExerciseData extends BaseExerciseData {
  type: "convert-from";
  expected: string;
}

type ConvertFromProps = ExerciseWrapperProps<ConvertFromExerciseData>;

const ConvertFromExercise: React.FC<ConvertFromProps> = ({
  expected,
  onComplete,
}: ConvertFromProps) => {
  const [text, setText] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const expectedMorse = convertToMorse(expected);
    const textMorse = convertToMorse(text);

    if (textMorse == expectedMorse) {
      onComplete();
    } else {
      alert("Incorrect!");
    }
  };

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <h3 className="font-semibold text-foreground/90">
        Convert this {expected.includes(" ") ? "sentence" : "word"}:
      </h3>
      <div className="flex gap-2 items-center">
        <Image
          alt="MorseLingo Logo"
          className="-scale-x-100"
          height={75 * 1.2051948052}
          src={"/Mascot_transparent.webp"}
          width={75}
        />
        <Card>
          <CardBody className="flex flex-row gap-2 items-center justify-center px-5">
            <div
              className={clsx(
                "flex flex-row gap-1 flex-wrap w-full items-center",
              )}
            >
              <MorseText value={convertToMorse(expected)} />
            </div>
            <p className="font-semibold hidden">
              {convertToMorse(expected)
                .split("/")
                .map((s, i) => (
                  <span key={i} className={i > 0 ? "ml-3" : ""}>
                    {s}
                  </span>
                ))}
            </p>
            <PlayMorse text={expected} />
          </CardBody>
        </Card>
      </div>
      <Form onSubmit={handleSubmit}>
        <Textarea
          isClearable
          isRequired
          className="w-full"
          minRows={2}
          placeholder="Type in English"
          style={{ fontSize: "16px" }}
          value={text}
          onValueChange={setText}
        />
        <div className="flex my-5 w-full">
          <Button
            className="flex-1 py-1 font-bold uppercase text-white"
            color={text.length == 0 ? "default" : "success"}
            disabled={text.length == 0}
            type="submit"
          >
            Check
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ConvertFromExercise;
