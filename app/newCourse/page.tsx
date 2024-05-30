import { auth } from "@/auth";
import NewCourseForm from "@/newCourse/NewCourseForm";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function NewCourse() {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="py-20 flex items-center justify-center">
      <NewCourseForm></NewCourseForm>
    </div>
  )
}