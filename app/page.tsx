"use client";
import { useEffect, useState } from "react";

import codes from "@/config/morse";

export default function Home() {
  const dashTime = 250;
  const [text, setText] = useState({
    previous: "",
    current: "",
  });
  const [timeSincePress, setTimeSincePress] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const handleMouseDown = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const timeout = setTimeout(() => {
      setText({ previous: text.previous, current: "-" });
      setTimeoutId(null);
    }, dashTime);

    setText({ previous: text.previous, current: "." });
    setTimeoutId(timeout);
    setTimeSincePress(Date.now());
  };

  const handleMouseUp = () => {
    const timePressed = Date.now() - timeSincePress;
    const morse = timePressed < dashTime ? "." : "-";

    console.log("Up");
    
    if (timeoutId) {
      console.log("Timeout cleared");
      
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setText({ previous: text.previous + morse, current: "" });
    setTimeSincePress(0);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    console.log("Event", e.key);
    console.log("Previous", text.previous, "Current", text.current);

    if (e.key === " " || e.key === "Enter") {
      setText({ previous: text.previous + " ", current: "" });
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    } else if (e.key === "Backspace") {
      setText({ previous: text.previous.slice(0, -1), current: "" });
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, timeoutId]);

  const convertFromMorse = (morse: string) => {
    return morse
      .split(" ")
      .map((word) => codes[word])
      .join(" ");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <p>Morse:</p>
      <p>
        {text.previous}
        {text.current}
      </p>
      <p>Converted morse:</p>
      <p>{convertFromMorse(text.previous + text.current)}</p>
      <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        Press
      </button>
    </section>
  );
}
