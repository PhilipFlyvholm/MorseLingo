import ConvertToExercise from "./convert-to-exercise";
import ConvertFromExercise from "./convert-from-exercise";
import MatchExercise from "./match-exercise";
import LetterExercise from "./letter-exercise";
import ChoiceExercise from "./choice-exercise";

import { ExerciseData, ExerciseWrapperProps } from "@/types";

const ExerciseFactory: React.FC<ExerciseWrapperProps<ExerciseData>> = ({
  onComplete,
  ...exercise
}) => {
  switch (exercise.type) {
    case "convert-to":
      return <ConvertToExercise {...exercise} onComplete={onComplete} />;
    case "convert-from":
      return <ConvertFromExercise {...exercise} onComplete={onComplete} />;
    case "match":
      return <MatchExercise {...exercise} onComplete={onComplete} />;
    case "letter":
      return <LetterExercise {...exercise} onComplete={onComplete} />;
    case "choice":
      return <ChoiceExercise {...exercise} onComplete={onComplete} />;
    default:
      return <div>Unsupported exercise type</div>;
  }
};

export default ExerciseFactory;
