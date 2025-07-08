import { WorkHistoryCarousel } from "@compound/work-history/WorkHistoryCarousel";
import { workHistory } from "./workHistoryData";

export const WorkHistory = () => {
  return <WorkHistoryCarousel workHistory={workHistory} />;
};

export default WorkHistory; 