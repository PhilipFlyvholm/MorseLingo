import { Progress } from "@nextui-org/progress";
type LessonProgressProps = {
  value: number;
};
export default function LessonProgress({ value }: LessonProgressProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Progress
        classNames={{
          base: "w-full",
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-orange-500 to-yellow-500",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        radius="md"
        showValueLabel={false}
        size="md"
        value={value}
      />
    </div>
  );
}
