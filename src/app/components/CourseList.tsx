import { CourseListProps } from '../../../types/types';

export default function CourseList({ course }: CourseListProps) {
  return <div className="w-full bg-green-600 flex-1">{course.courseCode}</div>;
}
