import { Metadata } from "next";

import LessonView from "./LessonView";

import { getSectionColor } from "@/config/sections";
import course from "@/config/course";

type MetaDataProps = {
  params: Promise<{ identifier: number[] }>;
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const identifier = await params;
  const [sectionNumber, levelNumber, lessonNumber] = identifier.identifier;

  return {
    title: `Lesson ${lessonNumber} - Level ${levelNumber} - Section ${sectionNumber}`,
  };
}

export default async function Lesson({
  params,
}: {
  params: Promise<{ identifier: number[] }>;
}) {
  const identifier = (await params).identifier;

  if (identifier.length !== 3 || identifier.find((i) => isNaN(i))) {
    return (
      <div>
        <h1>Invalid lesson</h1>
      </div>
    );
  }

  const [sectionNumber, levelNumber, lessonNumber] = identifier;
  const lesson = course[sectionNumber - 1][levelNumber - 1][lessonNumber - 1];

  if (lesson === undefined) {
    return (
      <div>
        <h1>Invalid lesson</h1>
      </div>
    );
  }

  return (
    <LessonView
      lesson={lesson}
      lessonNumber={lessonNumber}
      levelNumber={levelNumber}
      sectionColor={getSectionColor(sectionNumber)}
      sectionNumber={sectionNumber}
      totalLessons={course[sectionNumber - 1][levelNumber - 1].length}
    />
  );
}
