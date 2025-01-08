"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Icon } from "@iconify/react";

import { useAudio } from "./hooks/Audio";

import { ditSound, dahSound, convertToMorse } from "@/config/morse";
interface PlayMorseProps {
  text: string;
  speed?: number;
  volume?: number;
}

const DELAY = 250;

export default function PlayMorse({
  text,
  volume = 1,
  speed = 1,
}: PlayMorseProps) {
  const ditAudio = useAudio(`data:audio/wav;base64,${ditSound}`, {
    volume: volume,
    playbackRate: speed,
  });
  const dahAudio = useAudio(`data:audio/wav;base64,${dahSound}`, {
    volume: volume,
    playbackRate: speed,
  });
  const [playing, setPlaying] = useState<boolean>(false);
  const [morse, setMorse] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  const playCurrent = useCallback(
    (currentIndex: number) => {
      if (currentIndex >= morse.length) {
        setPlaying(false);
        setIndex(0);

        return;
      }

      const current = morse[currentIndex];

      if (current === " " || current === "/") {
        setIndex(currentIndex + 1);
        setTimeout(
          () => playCurrent(currentIndex + 1),
          current === "/" ? 3 * DELAY : DELAY,
        );

        return;
      }

      if (current === ".") {
        ditAudio.play();
      } else if (current === "-") {
        dahAudio.play();
      }

      setIndex(currentIndex + 1);
    },
    [morse, ditAudio, dahAudio],
  );

  const playMorse = () => {
    if (playing) {
      setPlaying(false);

      return;
    }
    setPlaying(true);
    setIndex(0);
    playCurrent(0);
  };

  const handleEnd = useCallback(() => {
    if (!playing) return;
    playCurrent(index);
  }, [playCurrent, index, playing]);

  useEffect(() => {
    setMorse(convertToMorse(text));
  }, [text]);

  useEffect(() => {
    ditAudio.addEventListener("ended", handleEnd);
    dahAudio.addEventListener("ended", handleEnd);

    return () => {
      ditAudio.removeEventListener("ended", handleEnd);
      dahAudio.removeEventListener("ended", handleEnd);
    };
  }, [ditAudio, dahAudio, handleEnd]);

  return (
    <Button
      isIconOnly
      aria-label={`Play Morse Code of ${text}`}
      color="primary"
      disabled={playing}
      variant="flat"
      onPress={playMorse}
    >
      <Icon
        icon={
          !playing || index % 3 < 2
            ? "streamline:volume-level-high"
            : "streamline:volume-level-low"
        }
      />
    </Button>
  );
}
