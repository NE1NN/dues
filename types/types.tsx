export type Course = {
  id: string;
  name: string;
  courseCode: string;
  courseName: string;
  assessmentItems: AssessmentItem[];
  progress: number;
  totalCourseMark: number;
};

export type AssessmentItem = {
  assName: string;
  weight: number;
  startWeek: number;
  endWeek: number;
  dueDate: string;
  status: string;
};

export type CourseToPush = {
  courseCode: string;
  courseName: string;
  assessmentItems: AssessmentItem[];
  progress: number;
  totalCourseMark: number;
};

export type MainContainerParams = {
  courses: Course[];
};

export type SelectedCoursesContextType = {
  courses: Course[];
  selectedCourses: Course[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
};

export type CourseListProps = {
  course: Course;
};

export type DueListProps = {
  assessment: AssessmentItem;
  courseCode: string;
};
