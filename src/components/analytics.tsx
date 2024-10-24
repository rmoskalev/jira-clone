import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { AnalyticsCard } from "./analytics-card";

import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {

  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <AnalyticsCard
          title="Total tasks"
          value={data.taskCount}
          variant={data.taskDifference > 0 ? "up" : "down"}
          increaseValue={data.taskDifference}
        />
        <AnalyticsCard
          title="Assigned to you"
          value={data.assignedTaskCount}
          variant={data.assignedTaskDifference > 0 ? "up" : "down"}
          increaseValue={data.assignedTaskDifference}
        />
         <AnalyticsCard
          title="Completed tasks"
          value={data.completedTaskCount}
          variant={data.completedTaskDifference > 0 ? "up" : "down"}
          increaseValue={data.completedTaskDifference}
        />
        <AnalyticsCard
          title="Overdue tasks"
          value={data.overDueTaskCount}
          variant={data.overDueTaskDifference > 0 ? "up" : "down"}
          increaseValue={data.overDueTaskDifference}
        />
        <AnalyticsCard
          title="Uncompleted tasks"
          value={data.incompleteTaskCount}
          variant={data.incompleteTaskDifference > 0 ? "up" : "down"}
          increaseValue={data.incompleteTaskDifference}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
