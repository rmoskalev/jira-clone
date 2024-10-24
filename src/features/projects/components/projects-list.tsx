import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "../../tasks/types";
import { useCreateTaskModal } from "../../tasks/hooks/use-create-task-modal";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { DottedSeparator } from "@/components";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Project } from "@/features/projects/types";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useState } from "react";

interface ProjectsListProps {
  projects: Project[];
  total: number;
}

export const ProjectsList = ({ projects, total }: ProjectsListProps) => {
  const workspaceId = useWorkspaceId();
  const { open: createProject } = useCreateProjectModal();

  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 6);

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4 min-h-[222px]">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Projects: ({total})</p>
          <Button variant={"muted"} size={"icon"} onClick={createProject}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visibleProjects.map((project) => (
            <li key={project.$id}>
              <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <ProjectAvatar
                      name={project.name}
                      image={project.imageUrl}
                      fallbackClassName="text-lg"
                      className="size-12"
                    />
                    <p className="text-lg font-semibold truncate">
                      {project.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No projects found
          </li>
        </ul>
        {projects.length > 6 && (
          <Button
            variant={"tertiary"}
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="mt-4 w-full"
          >
            {showAllProjects ? "Show less" : "Show all"}
          </Button>
        )}
      </div>
    </div>
  );
};
