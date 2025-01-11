"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LessonIndicator from "@/components/lesson/LessonIndicator";
import { Level } from "@/config/course/types";
import { sectionColors } from "@/config/sections";
import useLocalStorage from "@/components/hooks/LocalStorage";
import { LessonStorageData } from "@/types";
import course from "@/config/course";

type LevelButtonProps = {
  level: Level;
  levelNumber: number;
  sectionColor: keyof typeof sectionColors;
  sectionNumber: number;
};

export default function LevelButton({
  level,
  levelNumber,
  sectionColor,
  sectionNumber,
}: LevelButtonProps) {
  const router = useRouter();
  const [lessonStorage] = useLocalStorage<LessonStorageData>(
    "lessonStorage",
    {}
  );
  const [isLocked, setIsLocked] = useState(true);
  const [currentLesson, setCurrentLessons] = useState<number>(0);

  useEffect(() => {
    const currentLesson =
      Number(
        lessonStorage[`${sectionNumber}-${levelNumber}`]?.completedLevels
      ) || 0;

    setCurrentLessons(currentLesson);
    const prevKey = `${sectionNumber}-${levelNumber - 1}`;

    if (levelNumber === 1) {
      setIsLocked(false);

      return;
    }
    const prevLevelAmount = course[sectionNumber - 1][levelNumber - 2].length;

    const prevCompletedLevels = lessonStorage[prevKey]?.completedLevels || 0;
    const locked = prevCompletedLevels < prevLevelAmount || !lessonStorage;

    setIsLocked(locked);
  }, [lessonStorage, levelNumber, sectionNumber, level]);

  const handleLessonClick = () => {
    if (isLocked) return;
    router.push(
      `/lessons/${sectionNumber}/${levelNumber}/${Math.min(currentLesson + 1, level.length)}`
    );
  };

  return (
    <div
      className="flex justify-center"
      style={{
        transform: `translateX(${(sectionNumber % 2 == 0 ? 1 : -1) * Math.sin((levelNumber - (sectionNumber + 1)) * 5) * 25}px)`,
      }}
    >
      <LessonIndicator
        animateProgress={false}
        isButton={true}
        lessonNumber={currentLesson}
        levelNumber={levelNumber}
        locked={isLocked}
        sectionColor={sectionColor}
        totalLessons={level.length}
        onClick={handleLessonClick}
      />
    </div>
  );
}
