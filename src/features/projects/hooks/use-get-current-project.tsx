import { useParams } from "next/navigation";

export const useCurrentProjectId = () => {
  const params = useParams();
  
  return params.projectId as string;
};