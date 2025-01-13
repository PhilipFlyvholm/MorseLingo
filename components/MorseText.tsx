import clsx from "clsx";
import { DitSymbol, DahSymbol } from "./icons";

interface MorseTextProps {
  value: string;
  color?: string;
  height?: number;
  shadowColor?: string;
  shadowOffset?: number;
  backgroundColor?: string | "none";
}

export default function MorseText({
  value,
  color = "hsl(var(--nextui-default-800))",
  height = 8,
  shadowColor = "hsl(var(--nextui-default-200))",
  shadowOffset = 2,
  backgroundColor = "bg-default-100",
}: MorseTextProps) {
  return value.split("/").map((s, i) => (
    <span
      key={i}
      className={clsx(
        "my-[4px] flex flex-row gap-1 items-center px-2 rounded-full",
        backgroundColor !== "none" && backgroundColor,
      )}
    >
      {s.split("").map((char, i) => (
        <span key={i} className="my-[4px]">
          {char == "." ? (
            <DitSymbol
              color={color}
              height={height}
              shadowColor={shadowColor}
              shadowOffset={shadowOffset}
            />
          ) : char == "-" ? (
            <DahSymbol
              color={color}
              height={height}
              shadowColor={shadowColor}
              shadowOffset={shadowOffset}
            />
          ) : (
            " "
          )}
        </span>
      ))}
    </span>
  ));
}
