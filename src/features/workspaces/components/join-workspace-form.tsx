"use client";

import { DottedSeparator } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
  code: string;
  workspaceId: string;
}

export const JoinWorkspaceForm = ({
  initialValues,
  code,
  workspaceId,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: code },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join the workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>{" "}
          workspace
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <Button
            variant={"secondary"}
            type="button"
            asChild
            disabled={isPending}
            size={"lg"}
            className="w-full lg:w-fit"
          >
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button
            size={"lg"}
            type="button"
            disabled={isPending}
            onClick={onSubmit}
            className="w-full lg:w-fit"
          >
            Join a workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
