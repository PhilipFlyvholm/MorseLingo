"use client";
import { useEffect, useState } from "react";

import { codes } from "@/config/morse";

//Calulated based on "Paris" which is 50 time units
const standardWordLength = 50;

function WPMToTimeUnit(wpm: number) {
  return (60 / (standardWordLength * wpm)) * 1000;
}

function TimeUnitToWPM(timeUnit: number) {
  return 60 / ((timeUnit / 1000) * standardWordLength);
}

function convertTimeToMorse(
  timeDiff: number,
  timeUnit: number,
  pressed: boolean,
) {
  const rouned = Math.round(timeDiff / timeUnit);

  if (pressed) {
    return rouned >= 3 ? "-" : ".";
  } else if (rouned >= 3) {
    return rouned >= 7 ? "/" : " ";
  }

  return "";
}
type PressState = {
  time: number;
  pressed: boolean;
};
type TextState = {
  previous: string;
  current: string;
};

export default function Home() {
  const [timeUnit, setTimeUnit] = useState<number>(WPMToTimeUnit(10)); // 20WPM = 60 miliseconds
  const [text, setText] = useState<TextState>({
    previous: "",
    current: "",
  });
  const [pressState, setPressState] = useState<PressState | null>(null);

  const handleSectionEnd = () => {
    if (!pressState) return;
    const morse = convertTimeToMorse(
      Date.now() - pressState.time,
      timeUnit,
      pressState.pressed,
    );

    setText((v) => {
      return {
        previous: v.previous + morse,
        current: "",
      };
    });
  };

  const handleMouseDown = () => {
    handleSectionEnd();
    setPressState({ time: Date.now(), pressed: true });
    setText((v) => {
      return {
        previous: v.previous,
        current: ".",
      };
    });
  };

  const handleCurrent = () => {
    if (pressState) {
      setText({
        previous: text.previous,
        current: convertTimeToMorse(
          Date.now() - pressState.time,
          timeUnit,
          pressState.pressed,
        ),
      });
    }
  };

  const handleMouseUp = () => {
    handleSectionEnd();
    setPressState({ time: Date.now(), pressed: false });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    if (e.key === " " || e.key === "Enter") {
      handleMouseDown();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      handleMouseUp();
    } else if (e.key === "Backspace") {
      setText({ previous: text.previous.slice(0, -1), current: "" });
      setPressState(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [text]);

  useEffect(() => {
    const interval = setInterval(handleCurrent, timeUnit);

    return () => {
      clearInterval(interval);
    };
  });

  const convertFromMorse = (morse: string) => {
    return morse
      .split("/")
      .map((word) =>
        word
          .trim()
          .split(" ")
          .map((letter) => codes[letter])
          .join(""),
      )
      .join(" ");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <p>Morse:</p>
      <p>
        {
          (text.previous + text.current).replaceAll(" ", "_")
          /*.replaceAll("/", " ")*/
        }
      </p>
      <p>Converted morse:</p>
      <p>{convertFromMorse(text.previous + text.current)}</p>

      <p>Current {text.current.replace(" ", "SPACE")}</p>
      <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        Press
      </button>

      <p>
        WPM: {TimeUnitToWPM(timeUnit)} - TimeUnit {timeUnit} miliseconds
      </p>
      <input
        className="w-full"
        max={100}
        min={1}
        style={{ appearance: "none" }}
        type="range"
        value={TimeUnitToWPM(timeUnit)}
        onChange={(e) => setTimeUnit(WPMToTimeUnit(Number(e.target.value)))}
      />
    </section>
  );
}
