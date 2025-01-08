"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LessonProgress from "@/components/lesson/LessonProgress";
import { ExerciseData } from "@/types";
import ExerciseFactory from "@/components/exercises/ExerciseFactory";
import { ConvertToExerciseData } from "@/components/exercises/convert-to-exercise";
import { ConvertFromExerciseData } from "@/components/exercises/convert-from-exercise";
import { LetterExerciseData } from "@/components/exercises/letter-exercise";
import { MatchExerciseData } from "@/components/exercises/match-exercise";

type Lesson = ExerciseData[];
const TEST_LESSON: Lesson = [
  { type: "convert-to", expected: "Hallo" } as ConvertToExerciseData,
  {
    type: "convert-from",
    expected: "Hallo",
  } as ConvertFromExerciseData,
  {
    type: "match",
    expected: ["Hallo", "ate", "tea", "sos", "hot"],
  } as MatchExerciseData,
  { type: "letter", expected: "E" } as LetterExerciseData,
];

export default function Lesson() {
  const lesson = TEST_LESSON;
  const [index, setIndex] = useState(0);

  const handleComplete = () => {
    setIndex(index + 1);
  };

  return (
    <section className="flex flex-col h-full w-[90%] md:w-1/2 m-auto gap-5">
      <LessonProgress value={Math.max(index / lesson.length, 0.1) * 100} />
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          initial={{ opacity: index == 0 ? 1 : 0, scale: index == 0 ? 1 : 0 }}
        >
          {index < lesson.length ? (
            <ExerciseFactory
              key={index}
              {...lesson[index]}
              onComplete={handleComplete}
            />
          ) : (
            <h1 key={index}>Lesson complete</h1>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
