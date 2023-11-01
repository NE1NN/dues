import { AssContainerProps } from '../../../types/types';
import DueList from './DueList';

export default function CompletedAssessments({
  assessments,
}: AssContainerProps) {
  return (
    <div>
      <h1 className="font-bold text-black mt-4 text-2xl">Completed</h1>
      {assessments.map((assessment, idx) => (
        <DueList key={idx} assessment={assessment}></DueList>
      ))}
    </div>
  );
}
