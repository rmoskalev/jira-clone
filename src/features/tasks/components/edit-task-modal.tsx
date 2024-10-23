"use client";

import { ResponsiveModal } from "@/components";
import { CreateTaskFromWrapper } from "./create-task-form-wrapper";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import { EditTaskFromWrapper } from "./edit-task-form-wrapper";

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFromWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};
