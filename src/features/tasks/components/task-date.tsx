import { cn } from "@/lib/utils";
import { differenceInDays, format, isValid } from "date-fns";

interface TaskDateProps {
  value: string;
  className?: string;
}

export const TaskDate = ({ value, className }: TaskDateProps) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = differenceInDays(endDate, today);

  if (!isValid(diffInDays)) {
    return <span className={cn("text-muted-foreground", className)}>Invalid date</span>;
  }

  let textColor = "text-green-600";

  if (diffInDays <= 1) {
    textColor = "text-red-500";
  }  else if (diffInDays <= 3) {
    textColor = "text-yellow-500";
  }

  return (
    <div className={textColor}>
      <span className={cn("truncate", className)}>{format(value, "PPP")}</span>
    </div>
  );
};
