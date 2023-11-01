import { UpcomingAssProps } from '../../../types/types';
import DueList from './DueList';

export default function getUpcomingAssessments({
  upcomingAss,
}: UpcomingAssProps) {
  return (
    <div>
      <h1 className="font-bold text-black mt-4 text-2xl">Upcoming deadlines</h1>
      {upcomingAss.map((assessment, idx) => (
        <DueList key={idx} assessment={assessment}></DueList>
      ))}
    </div>
  );
}
