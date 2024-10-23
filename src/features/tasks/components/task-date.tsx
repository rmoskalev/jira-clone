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

  let textColor = "text-black-600 font-semibold";

  if (diffInDays >= 0 && diffInDays <= 2) {
    textColor = "text-amber-500 font-semibold";
  } else if (diffInDays > 2 && diffInDays <= 6) {
    textColor = "text-green-500 font-semibold";
  } else if (diffInDays <= 0) {
    textColor = "text-red-500 font-bold";
  }

  return (
    <div className={textColor}>
      <span className={cn("truncate", className)}>{format(value, "PPP")}</span>
    </div>
  );
};
