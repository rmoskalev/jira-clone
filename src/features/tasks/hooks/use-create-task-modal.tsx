import { useQueryState, parseAsBoolean, parseAsStringEnum } from "nuqs";
import { TaskStatus } from "../types";

export const useCreateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const [taskStatus, setTaskStatus] = useQueryState("task-status", 
    parseAsStringEnum<TaskStatus>(Object.values(TaskStatus)).withDefault(TaskStatus.TODO).withOptions({ clearOnDefault: true })
  );

  const open = (status: TaskStatus) => {
    setTaskStatus(status)
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    taskStatus,
    setIsOpen,
  };
};
