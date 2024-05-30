import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NewPageForm from "./NewPageForm";

interface Props {
  params: {
    courseId: string;
  }
}

export default async function newCoursePage({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="py-20 flex items-center justify-center">
      <NewPageForm courseId={params.courseId}></NewPageForm>
    </div>
  )
}