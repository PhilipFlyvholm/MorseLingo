"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { sectionColors } from "../../../config/sections";

import ExerciseFactory from "@/components/exercises/ExerciseFactory";
import LessonComplete from "@/components/lesson/LessonComplete";
import LessonProgress from "@/components/lesson/LessonProgress";
import { Lesson } from "@/config/course/types";
import useLocalStorage from "@/components/hooks/LocalStorage";
import { LessonStorageData } from "@/types";

interface LessonViewProps {
  lesson: Lesson;
  lessonNumber: number;
  levelNumber: number;
  totalLessons: number;
  sectionColor: keyof typeof sectionColors;
  sectionNumber: number;
}

export default function LessonView({
  lesson,
  lessonNumber,
  levelNumber,
  totalLessons,
  sectionColor,
  sectionNumber,
}: LessonViewProps) {
  const [index, setIndex] = useState(0);
  const [_lessonStorage, setLessonStorage] = useLocalStorage<LessonStorageData>(
    "lessonStorage",
    {}
  );
  const handleComplete = () => {
    setIndex(index + 1);
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
    if (index + 1 == lesson.length) {
      const key = `${sectionNumber}-${levelNumber}`;

      const newStorage = {
        ..._lessonStorage,
        [key]: {
          completedLevels: lessonNumber,
        },
      };

      setLessonStorage(newStorage);
    }
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
            <LessonComplete
              key={index}
              lessonNumber={lessonNumber}
              levelNumber={levelNumber}
              sectionColor={sectionColor}
              totalLessons={totalLessons}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
