"use client";

import { Analytics } from "@/components/analytics";
import { PageError } from "@/components/page-error";
import { TasksList } from "@/features/tasks/components/task-list";
import { PageLoader } from "@/components/page-loader";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { ProjectsList } from "@/features/projects/components/projects-list";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { CompletedTasks } from "@/features/tasks/components/completed-tasks";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { HomeMembersList } from "@/features/members/components/home-members-list";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";

export const WorkspaceIdClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: analytics, isLoading: isLoadingAnalytics } =
    useGetWorkspaceAnalytics({ workspaceId });
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
  });
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading =
    isLoadingAnalytics ||
    isLoadingTasks ||
    isLoadingProjects ||
    isLoadingMembers;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!analytics || !tasks || !projects || !members) {
    return <PageError message="Failed to load workspace data" />;
  }

  return (
    <div className="h-full flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TasksList tasks={tasks.documents} />
        <CompletedTasks tasks={tasks.documents} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ProjectsList projects={projects.documents} total={projects.total} />
        <HomeMembersList members={members.documents} total={members.total} />
      </div>
    </div>
  );
};
