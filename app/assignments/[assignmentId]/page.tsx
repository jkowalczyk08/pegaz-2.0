import { auth } from "@/auth";
import CourseOwnerCheck from "@/components/CourseOwnerCheck";
import Deadline from "@/components/Deadline";
import Solution from "@/components/Solution";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import AssignmentGradeForm from "./AssignmentGradeForm";

interface Props {
  params: {
    assignmentId: string
  }
}

export default async function Assignment({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  const assignment = await prisma.assignment.findFirst({
    where: {
      id: params.assignmentId
    },
    include: {
      page: {
        include: {
          course: {
            include: {
              owners: true
            }
          }
        }
      },
      user: true
    }
  })

  if (assignment == null) {
    return (
      <div className="py-16 flex items-center justify-center">
        <h3 className="text-xl font-semibold">
          {"Something went wrong."}
        </h3>
      </div>
    )
  }

  return (
    <CourseOwnerCheck owners={assignment.page.course.owners}>
      <div className="py-8 px-12">
        <div className="flex items-center">
          <div>
            <h2 className="text-3xl font-bold">
              {assignment.page.name}
            </h2>
            <Deadline page={assignment.page}></Deadline>
          </div>
          <div className="grow">
          </div>
          <div className="flex items-center space-x-8">
            <Link
                className="w-40 border border-rose-600 text-rose-600 hover:bg-slate-100 font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline text-center"
                href={`/pages/${assignment.pageId}`}
              >
                Back to Page
            </Link>
          </div>
        </div>
        <div className="mt-8 py-4 px-8 border border-gray-200 rounded-3xl whitespace-pre-line shadow-md">
          {assignment.page.description}
        </div>
        <Solution userAssignment={assignment} user={assignment.user}/>
        <AssignmentGradeForm assignmentId={assignment.id}/>
      </div>
    </CourseOwnerCheck>
  )
}