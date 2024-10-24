import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "../types";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { DottedSeparator } from "@/components";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Card, CardContent } from "@/components/ui/card";
import { differenceInHours, formatDistanceToNow, isBefore } from "date-fns";
import { useState } from "react";

interface TasksListProps {
  tasks: Task[];
}

export const TasksList = ({ tasks }: TasksListProps) => {
  const workspaceId = useWorkspaceId();
  const { open: createTask } = useCreateTaskModal();

  const [showAllTasks, setShowAllTasks] = useState(false);

  const activeTasks = tasks.filter((task) => task.status !== TaskStatus.DONE);

  const sortedTasks = activeTasks.sort((a, b) => {
    const now = new Date();
    const dueDateA = new Date(a.dueDate);
    const dueDateB = new Date(b.dueDate);

    if (isBefore(dueDateA, now) && !isBefore(dueDateB, now)) return -1;
    if (isBefore(dueDateB, now) && !isBefore(dueDateA, now)) return 1;

    return dueDateA.getTime() - dueDateB.getTime();
  });

  const visibleTasks = showAllTasks ? sortedTasks : sortedTasks.slice(0, 6);

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Active Tasks: ({activeTasks.length})
          </p>
          <Button
            variant={"muted"}
            size={"icon"}
            onClick={() => createTask(TaskStatus.TODO)}
          >
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {visibleTasks.map((task) => (
            <li key={task.$id}>
              <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4">
                    <p className="text-lg font-medium truncate">{task.name}</p>
                    <div className="flex items-center gap-x-2">
                      <p className="truncate">{task.project?.name}</p>
                      <div className="size-1 rounded-full bg-neutral-300 mx-1" />
                      <div className="text-sm text-muted-foreground flex items-center">
                        <CalendarIcon className="size-3 mr-1" />
                        <span
                          className={`truncate ${
                            isBefore(new Date(task.dueDate), new Date())
                              ? "text-red-500"
                              : differenceInHours(
                                  new Date(task.dueDate),
                                  new Date()
                                ) < 24
                              ? "text-yellow-500"
                              : ""
                          }`}
                        >
                          {isBefore(new Date(task.dueDate), new Date())
                            ? "overdue by "
                            : ""}
                          {formatDistanceToNow(new Date(task.dueDate))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No active tasks found
          </li>
        </ul>
        {activeTasks.length > 6 && (
          <Button
            variant={"tertiary"}
            onClick={() => setShowAllTasks(!showAllTasks)}
            className="mt-4 w-full"
          >
            {showAllTasks ? "Show less" : "Show all"}
          </Button>
        )}
        <Button variant={"muted"} asChild className="mt-4 w-full">
          <Link href={`/workspaces/${workspaceId}/tasks`}>My tasks</Link>
        </Button>
      </div>
    </div>
  );
};
