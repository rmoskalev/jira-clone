import { Query } from "node-appwrite";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";

import { getMember } from "../members/utils";
import { Workspace } from "./types";

export const getWorkspaces = async () => {
  try {
    const { databases, account } = await createSessionClient();
    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (!members.documents.length) {
      return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [(Query.orderDesc("createdAt"), Query.contains("$id", workspaceIds))]
    );

    return workspaces;
  } catch {
    return { documents: [], total: 0 };
  }
};

interface GetWorkspaceProps {
  workspaceId: string;
}

type WorkspaceResult = Workspace | { error: string; status: number };

export const getWorkspace = async ({
  workspaceId,
}: GetWorkspaceProps): Promise<WorkspaceResult> => {
  try {
    const { databases, account } = await createSessionClient();

    const user = await account.get();

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });

    if (!member) {
      throw new Error("Unauthorized");
    }

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    return workspace;
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
    } else {
      console.error("Неожиданная ошибка:", error);
      return { error: "Неизвестная ошибка", status: 500 };
    }
  }
};

interface GerWorkspaceInfoProps {
  workspaceId: string;
}

export const getWorkspaceInfo = async ({
  workspaceId,
}: GerWorkspaceInfoProps) => {
  try {
    const { databases } = await createSessionClient();

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    return {
      name: workspace.name,
    };
  } catch {
    return null;
  }
};
