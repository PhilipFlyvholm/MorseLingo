import { CircularProgress } from "@nextui-org/progress";

import { SectionColorName, sectionColors } from "../../config/sections";

type LessonIndicatorProps = {
  sectionColor: SectionColorName;
  levelNumber: number;
  lessonNumber: number;
  totalLessons: number;
  animateProgress?: boolean;
  locked?: boolean;
} & (
  | { isButton: false; onClick?: undefined }
  | {
      isButton: true;
      onClick: () => void;
    }
);
export default function LessonIndicator({
  sectionColor,
  levelNumber,
  lessonNumber,
  totalLessons,
  isButton,
  animateProgress = true,
  locked = false,
  ...props
}: LessonIndicatorProps) {
  const color = locked
    ? { background: "gray", border: "#737373", text: "white" }
    : sectionColors[sectionColor];
  const style = `
    text-[var(--section-text)]
    w-16 
    flex justify-center items-center 
    rounded-full aspect-square 
    text-xl font-bold 
    p-2 
    col-span-full row-span-full 
    sectionDashedBackground`;
  const buttonStyle = `
    shadow-[0px_4px_0px_var(--section-border)]
    mb-[4px]
    transition-shadow
    sectionButton
    hover:cursor-pointer
    active:shadow-[0px_2px_0px_var(--section-border)]
    `;

  return (
    <div
      className="grid grid-cols-1 grid-rows-1 place-items-center"
      style={
        {
          "--section-background": color.background,
          "--section-border": color.border,
          "--section-text": color.text,
        } as React.CSSProperties
      }
    >
      {isButton ? (
        <button
          className={`${style} ${locked ? "cursor-not-allowed" : buttonStyle}`}
          onClick={locked ? undefined : props.onClick}
        >
          <p>{levelNumber}</p>
        </button>
      ) : (
        <div className={style}>
          <p>{levelNumber}</p>
        </div>
      )}
      {!locked ? (
        <CircularProgress
          classNames={{
            base: "col-span-full row-span-full",
            svg: "w-24 h-24 drop-shadow-md",
            indicator: `stroke-[var(--section-background)]`,
            value: "text-3xl font-semibold text-white",
          }}
          disableAnimation={!animateProgress}
          showValueLabel={false}
          strokeWidth={2}
          value={(lessonNumber / totalLessons) * 100}
        />
      ) : (
        <div className="col-span-full row-span-full w-24 h-24" />
      )}
    </div>
  );
}
