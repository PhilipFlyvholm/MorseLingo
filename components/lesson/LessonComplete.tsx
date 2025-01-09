import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import LessonIndicator from "./LessonIndicator";

import { SectionColorName } from "@/config/sections";

type LessonCompleteProps = {
  sectionColor: SectionColorName;
  levelNumber: number;
  lessonNumber: number;
  totalLessons: number;
};

export default function LessonComplete({
  sectionColor,
  levelNumber,
  lessonNumber,
  totalLessons,
}: LessonCompleteProps) {
  return (
    <>
      <div className="flex flex-col  justify-around h-full w-full gap-5">
        <h2 className="text-4xl text-center font-semibold text-foreground/90">
          Lesson complete
        </h2>
        <div className="flex flex-col items-center gap-5">
          <LessonIndicator
            isButton={false}
            lessonNumber={lessonNumber}
            levelNumber={levelNumber}
            sectionColor={sectionColor}
            totalLessons={totalLessons}
          />
          <p>You&apos;re making progress!</p>
        </div>
        <Button
          as={Link}
          className="font-bold text-white uppercase"
          color="success"
          href="/lessons"
        >
          Continue
        </Button>
      </div>
    </>
  );
}
