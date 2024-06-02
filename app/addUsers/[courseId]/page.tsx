import { auth } from "@/auth";
import CourseOwnerCheck from "@/components/CourseOwnerCheck";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AddUsersForm from "./AddUsersForm";

interface Props {
  params: {
    courseId: string;
  }
}

export default async function addUsersPage({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  const course = await prisma.course.findFirst({
    where: {
      id: params.courseId
    },
    include: {
      owners: true
    }
  })

  if (course == null) {
    return (
      <div className="py-16 flex items-center justify-center">
        <h3 className="text-xl font-semibold">
          {"Something went wrong."}
        </h3>
      </div>
    )
  }

  return (
    <CourseOwnerCheck owners={course.owners}>
      <div className="py-20 flex items-center justify-center">
        <AddUsersForm courseId={params.courseId}></AddUsersForm>
      </div>
    </CourseOwnerCheck>
  )
}