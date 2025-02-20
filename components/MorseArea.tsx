"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { convertToMorse } from "../config/morse";

import MorseText from "./MorseText";

interface MorseAreaProps {
  value: string;
  isMorse?: boolean;
  minRows?: number;
  center?: boolean;
}

export default function MorseArea({
  value,
  isMorse = true,
  minRows = 1,
  center = true,
}: MorseAreaProps) {
  const inputArea = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<number>(1);

  useEffect(() => {
    if (!inputArea.current) return;
    const { height } = inputArea.current.getBoundingClientRect();
    const newLines = Math.ceil(height / 35);

    setLines(Math.max(newLines, minRows));
  }, [inputArea.current, value]);

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <div className="w-full h-full col-span-full row-span-full">
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className="w-full h-1 bg-default-300 rounded-full mt-[32px]"
          />
        ))}
      </div>
      <div className="w-full h-full col-span-full row-span-full">
        <div
          ref={inputArea}
          className={clsx(
            "flex flex-row gap-1 flex-wrap w-full",
            center && "justify-center",
          )}
        >
          {value && (
            <MorseText
              color="hsl(var(--nextui-secondary-600))"
              height={16}
              shadowColor="hsl(var(--nextui-secondary-200))"
              shadowOffset={2}
              value={isMorse ? value : convertToMorse(value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
