import { text } from "stream/consumers";

import { Icon } from "@iconify/react";

import { InputButton } from "../buttons/InputButton";
import { DitSymbol, DahSymbol } from "../icons";
import MorseArea from "../MorseArea";

interface MorseInputProps {
  text: string;
  handleButtonPress: (type: "dit" | "dah") => void;
  handleDelete: () => void;
  canDelete: boolean;
}

export default function MorseInput({
  text,
  handleButtonPress,
  handleDelete,
  canDelete,
}: MorseInputProps) {
  return (
    <>
      <MorseArea value={text} />
      <div className="grid grid-cols-5 gap-2 mt-5">
        <div className="col-span-1" />
        <div className="flex justify-center gap-2 col-span-3">
          <InputButton
            buttonKey="."
            className="aspect-square h-auto"
            onPress={() => handleButtonPress("dit")}
          >
            <DitSymbol
              color="#fff"
              height={20}
              shadowColor="var(--tw-shadow-color)"
              shadowOffset={2}
            />
          </InputButton>

          <InputButton
            buttonKey="-"
            className="aspect-square h-auto"
            onPress={() => handleButtonPress("dah")}
          >
            <DahSymbol
              color="#fff"
              height={30}
              shadowColor="var(--tw-shadow-color)"
            />
          </InputButton>
        </div>
        <div className="flex flex-row justify-end col-span-1 w-full items-center">
          <InputButton
            buttonKey="Backspace"
            className="aspect-square h-auto w-full min-w-0"
            disabled={!canDelete}
            onPress={() => handleDelete()}
          >
            <Icon
              color="#fff"
              fontSize={"1.5rem"}
              icon="streamline:delete-keyboard-solid"
            />
          </InputButton>
        </div>
      </div>
    </>
  );
}
