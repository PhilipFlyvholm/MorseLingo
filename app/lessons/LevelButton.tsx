"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LessonIndicator from "@/components/lesson/LessonIndicator";
import { Level } from "@/config/course/types";
import { sectionColors } from "@/config/sections";
import useLocalStorage from "@/components/hooks/LocalStorage";
import { LessonStorageData } from "@/types";

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
    {},
  );
  const [isLocked, setIsLocked] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    const currentLesson = 1;
    const prevKey =
      currentLesson == 1
        ? `${sectionNumber}-${levelNumber - 1}`
        : `${sectionNumber}-${levelNumber}`;

    //-${course[sectionNumber - 1][levelNumber - 1].length}
    setCurrentLevel(
      lessonStorage[`${sectionNumber}-${levelNumber}`]?.completedLevels || 0,
    );
    const completedLevels = lessonStorage[prevKey]?.completedLevels || 0;
    const locked =
      (levelNumber !== 1 && Number(completedLevels) < level.length) ||
      !lessonStorage;

    console.log(locked, Number(completedLevels), levelNumber);

    setIsLocked(locked);
  }, [lessonStorage, levelNumber, sectionNumber, level]);

  const handleLessonClick = () => {
    if (isLocked) return;
    router.push(
      `/lessons/${sectionNumber}/${levelNumber}/${Math.min(currentLevel + 1, level.length)}`,
    );
  };

  return (
    <div
      className="flex justify-center"
      style={{
        transform: `translateX(${(sectionNumber % 2 == 0 ? 1 : -1) * Math.sin((levelNumber - (sectionNumber+1)) * 5) * 25}px)`,
      }}
    >
      <LessonIndicator
        animateProgress={false}
        isButton={true}
        lessonNumber={currentLevel}
        levelNumber={levelNumber}
        locked={isLocked}
        sectionColor={sectionColor}
        totalLessons={level.length}
        onClick={handleLessonClick}
      />
    </div>
  );
}
