import { AssContainerProps } from '../../../types/types';
import DueList from './DueList';

export default function UpcomingAssessments({
  assessments,
}: AssContainerProps) {
  return (
    <div>
      <h1 className="font-bold text-black mt-4 text-2xl">Upcoming deadlines</h1>
      {assessments.map((assessment, idx) => (
        <DueList
          key={`${assessment.id}${idx}`}
          assessment={assessment}
        ></DueList>
      ))}
    </div>
  );
}
