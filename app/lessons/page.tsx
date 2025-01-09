import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import LevelButton from "./LevelButton";

import { getSectionColor, sectionColors } from "@/config/sections";
import course from "@/config/course";
import { Section as SectionData } from "@/config/course/types";

interface SectionProps {
  id: number;
  section: SectionData;
}

function Section({ id, section }: SectionProps) {
  const sectionColorKey = getSectionColor(id);
  const sectionColor = sectionColors[sectionColorKey];

  return (
    <Card className="w-full max-w-[300px]">
      <CardHeader
        className="text-white"
        style={{ background: sectionColor.background }}
      >
        <h2 className="font-semibold text-center w-full">Section {id}</h2>
      </CardHeader>
      <Divider />
      <CardBody className="px-24 py-5">
        {section.map((level, i) => (
          <LevelButton
            key={i}
            level={level}
            levelNumber={i + 1}
            sectionColor={sectionColorKey}
            sectionNumber={id}
          />
        ))}
      </CardBody>
    </Card>
  );
}

export default function Lessons() {
  return (
    <section className="flex flex-row flex-wrap justify-center items-center gap-5">
      {course.map((section, i) => (
        <Section key={i} id={i + 1} section={section} />
      ))}
    </section>
  );
}
