import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { DottedSeparator } from "./dotted-separator";

interface AnalyticsCardProps {
  title: string;
  value: number;
  variant: "up" | "down";
  increaseValue: number;
}

export const AnalyticsCard = ({
  title,
  value,
  variant,
  increaseValue,
}: AnalyticsCardProps) => {
  const isUpVariant =
    title === "Uncompleted tasks" || title === "Overdue tasks"
      ? variant === "down"
      : variant === "up";
  const iconColor = isUpVariant ? "text-emerald-500" : "text-red-500";
  const increaseValueColor = isUpVariant ? "text-emerald-500" : "text-red-500";
  const Icon = variant === "up" ? FaCaretUp : FaCaretDown;

  return (
    <div className="flex items-center flex-1">
      <Card className="shadow-none border-none w-full">
        <CardHeader>
          <div className="flex items-center">
            <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
              <span className="truncate text-base">{title}</span>
            </CardDescription>
            <div className="flex items-center gap-x-1">
              <Icon className={cn(iconColor, "size-4")} />
              <span
                className={cn(
                  increaseValueColor,
                  "truncate text-base font-medium"
                )}
              >
                {increaseValue}
              </span>
            </div>
          </div>
          <CardTitle className="3xl font-semibold">{value}</CardTitle>
        </CardHeader>
      </Card>
      <DottedSeparator direction="vertical" />
    </div>
  );
};
