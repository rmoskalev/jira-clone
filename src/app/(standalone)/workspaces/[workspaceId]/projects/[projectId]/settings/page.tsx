import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectIdSettingPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdSettingPage = async ({ params }: ProjectIdSettingPageProps) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  if ("error" in initialValues) {
    switch (initialValues.status) {
      case 403:
        redirect("/sign-in");
      case 404:
        redirect("/not-found");
      default:
       return console.error("Неизвестная ошибка");
    }
  }

  return (
    <div className="w-full lg:max-w-2xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};

export default ProjectIdSettingPage;
