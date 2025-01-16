import { Course } from "./types";
import Section1 from "./sections/section-1";
import TestSection from "./sections/test-section";
const devCourses: Course = [TestSection];
const course: Course = (() => {
  let coures = [Section1];

  if (process.env.NODE_ENV === "development") {
    coures = [...coures, ...devCourses];
  }

  return coures;
})();

export default course;
