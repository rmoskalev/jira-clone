import { createSessionClient } from "@/lib/appwrite";
import { getMember } from "../members/utils";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { Project } from "./types";

interface GerProjectProps {
  projectId: string;
}

type ProjectResult = Project | { error: string; status: number };

export const getProject = async ({
  projectId,
}: GerProjectProps): Promise<ProjectResult> => {
  try {
    const { databases, account } = await createSessionClient();

    const user = await account.get();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });

    if (!member) {
      throw new Error("Unauthorized");
    }

    return project;
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "Unauthorized":
          return { error: "You have to authorize to continue", status: 403 };
        case "Not Found":
          return { error: "Page not found", status: 404 };
        default:
          console.error("Ошибка:", error.message);
          return { error: "Произошла ошибка", status: 500 };
      }
    }
    return { error: "Неизвестная ошибка", status: 500 };
  }
};
