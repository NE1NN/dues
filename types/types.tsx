export type Course = {
  id: string;
  name: string;
  courseCode: string;
  courseName: string;
  assessmentItems: Assessment[];
  progress: number;
  totalCourseMark: number;
};

export type Assessment = {
  id: string;
  assName: string;
  weight: number;
  startWeek: number;
  endWeek: number;
  dueDate: string;
  status: string;
  courseCode: string;
  isWeekly: boolean;
};

export type CourseToPush = {
  courseCode: string;
  courseName: string;
  assessmentItems: Assessment[];
  progress: number;
  totalCourseMark: number;
};

export type AssessmentToPush = {
  assName: string;
  weight: number;
  startWeek: number;
  endWeek: number;
  dueDate: string;
  status: string;
  courseCode: string;
  isWeekly: boolean;
};

export type MainContainerProps = {
  courses: Course[];
  assessments: Assessment[];
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
  assessment: Assessment;
};

export type AssContainerProps = {
  assessments: Assessment[];
};
