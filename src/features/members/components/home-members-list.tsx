import { Button } from "@/components/ui/button";
import { Member } from "../types";
import { SettingsIcon } from "lucide-react";
import { DottedSeparator } from "@/components";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { MemberAvatar } from "./member-avatar";

interface HomeMembersListProps {
  members: Member[];
  total: number;
}

export const HomeMembersList = ({ members, total }: HomeMembersListProps) => {
  const workspaceId = useWorkspaceId();
  console.log(members);

  const [showAllMembers, setShowAllMembers] = useState(false);

  const visibleMembers = showAllMembers ? members : members.slice(0, 6);

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4 min-h-[222px]">
        <div className="flex items-center justify-between h-[32px]">
          <p className="text-lg font-semibold">Members: ({total})</p>
          <Button asChild variant={"secondary"} size={"icon"}>
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleMembers.map((member) => (
            <li key={member.$id}>
              <Card
                className={`shadow-none rounded-lg ${
                  member.role === "ADMIN"
                    ? "border-red-400"
                    : "border-amber-400"
                } border-2`}
              >
                <CardContent className="p-3 flex relative flex-col items-start gap-x-2">
                  <MemberAvatar
                    name={member.name}
                    fallbackClassName="text-lg"
                    className="size-12"
                  />
                  <p
                    className={`absolute right-0 mr-2 text-xs font-semibold ${
                      member.role === "ADMIN"
                        ? "text-red-400"
                        : "text-amber-500"
                    }`}
                  >
                    {member.role}
                  </p>
                  <div className="flex flex-col items-start w-full truncate">
                    <p className="text-lg font-semibold truncate">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No members found
          </li>
        </ul>
        {members.length > 5 && (
          <Button
            variant={"tertiary"}
            onClick={() => setShowAllMembers(!showAllMembers)}
            className="mt-4 w-full"
          >
            {showAllMembers ? "Show less" : "Show all"}
          </Button>
        )}
      </div>
    </div>
  );
};
