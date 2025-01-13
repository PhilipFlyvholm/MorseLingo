"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/button";
import { Icon } from "@iconify/react";

import { ditSound, dahSound, convertToMorse } from "@/config/morse";
interface PlayMorseProps {
  text: string;
  speed?: number;
  volume?: number;
}

const useAudioContext = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    setAudioContext(context);

    return () => {
      context.close();
    };
  }, []);

  return audioContext;
};

const useAudioBuffer = (
  audioContext: AudioContext | null,
  base64: string,
  volume = 1,
  speed = 1,
) => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    if (!audioContext) return;

    const fetchData = async () => {
      const response = await fetch(base64);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioContext.decodeAudioData(arrayBuffer);

      setAudioBuffer(buffer);
    };

    fetchData();
  }, [audioContext, base64]);

  const playSound = (callback: () => void) => {
    if (!audioContext) return;

    const source = audioContext.createBufferSource();

    source.buffer = audioBuffer;
    const gainNode = audioContext.createGain();

    gainNode.gain.value = volume;
    source.playbackRate.value = speed;
    source.connect(gainNode).connect(audioContext.destination);
    source.start();
    source.onended = callback;
  };

  return [playSound, audioBuffer] as const;
};

export default function PlayMorse({
  text,
  volume = 1,
  speed = 1,
}: PlayMorseProps) {
  const audioContext = useAudioContext();
  const [playDitAudio, ditBuffer] = useAudioBuffer(
    audioContext,
    `data:audio/wav;base64,${ditSound}`,
    volume,
    speed,
  );
  const [playDahAudio] = useAudioBuffer(
    audioContext,
    `data:audio/wav;base64,${dahSound}`,
    volume,
    speed,
  );
  const ditDuration = useMemo(
    () => (ditBuffer?.duration || 0.25) * 1000,
    [ditBuffer],
  );

  const [queue, setQueue] = useState<("DIT" | "DAH" | "BREAK")[]>([]);

  const playCurrent = useCallback(() => {
    if (queue.length === 0) {
      return [];
    }

    const current = queue[0];

    if (current === "BREAK") {
      setTimeout(() => {
        setQueue((queue) => queue.slice(1));
      }, ditDuration * 3);

      return;
    }

    if (current === "DIT") {
      playDitAudio(() =>
        setTimeout(() => {
          setQueue((queue) => queue.slice(1));
        }, ditDuration),
      );
    } else if (current === "DAH") {
      playDahAudio(() =>
        setTimeout(() => {
          setQueue((queue) => queue.slice(1));
        }, ditDuration),
      );
    }
  }, [playDitAudio, playDahAudio]);

  const playMorse = () => {
    if (queue.length > 0) {
      setQueue([]);

      return;
    }

    const morse = convertToMorse(text);

    for (let i = 0; i < morse.length; i++) {
      const current = morse[i];

      if (current === " ") {
        setQueue((prev) => [...prev, "BREAK"]);
      } else if (current === "/") {
        setQueue((prev) => [...prev, "BREAK", "BREAK"]);
      } else {
        setQueue((prev) => [...prev, current === "." ? "DIT" : "DAH"]);
      }
    }
    playCurrent();
  };

  useEffect(() => {
    if (queue.length > 0) {
      playCurrent();
    }
  }, [queue, playCurrent]);

  return (
    <>
      <Button
        isIconOnly
        aria-label={`Play Morse Code of ${text}`}
        color="primary"
        variant="flat"
        onPress={playMorse}
      >
        <Icon
          icon={
            queue.length == 0 || queue.length % 3 < 2
              ? "streamline:volume-level-high"
              : "streamline:volume-level-low"
          }
        />
      </Button>
    </>
  );
}
