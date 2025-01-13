"use client";
import { useEffect, useRef } from "react";

export const useAudio = (src: string, { volume = 1, playbackRate = 1 }) => {
  const audio = useRef(
    typeof Audio !== "undefined" ? new Audio(src) : undefined,
  );

  useEffect(() => {
    if (!audio.current) return;
    audio.current.volume = volume;
  }, [volume, audio.current]);

  useEffect(() => {
    if (!audio.current) return;
    audio.current.playbackRate = playbackRate;
    audio.current.preload = "auto";
  }, [playbackRate, audio.current]);

  return audio.current;
};
