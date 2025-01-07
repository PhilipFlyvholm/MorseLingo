import MatchExercise from "../../components/exercises/match-exercise";

import ConvertExercise from "@/components/exercises/convert-exercise";
import { LetterExercise } from "@/components/exercises/letter-exercise";
import LessonProgress from "@/components/lesson/LessonProgrss";

export default function Lesson() {
  return (
    <section className="flex flex-col h-full w-[90%] md:w-1/2 m-auto gap-5">
      <LessonProgress value={5} />
      <ConvertExercise expected="Hallo" />
      <MatchExercise expected={["Hallo", "ate", "tea", "sos", "hot"]} />
      <LetterExercise expected="E" />
    </section>
  );
}
