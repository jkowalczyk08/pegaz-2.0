import { auth } from "@/auth";
import AssignmentStudentCheck from "@/components/AssignmentStudentCheck";
import Deadline from "@/components/Deadline";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import SubmitAssignmentForm from "./SubmitAssignmentForm";

interface Props {
  params: {
    assignmentId: string
  }
}

export default async function submitAssignment({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  const assignment = await prisma.assignment.findFirst({
    where: {
      id: params.assignmentId
    },
    include: {
      page: true
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
    <AssignmentStudentCheck assignment={assignment}>
      <div className="py-8 px-12">
        <div className="flex items-center">
          <div>
            <h2 className="text-3xl font-bold">
              {assignment.page.name}
            </h2>
            <Deadline page={assignment.page}></Deadline>
          </div>
        </div>
        <div className="mt-8 py-4 px-8 border border-gray-200 rounded-3xl whitespace-pre-line shadow-md">
          {assignment.page.description}
        </div>
        <h2 className="text-3xl font-bold py-8">
          Solution
        </h2>
        <SubmitAssignmentForm assignmentId={assignment.id} pageId={assignment.pageId}/>
      </div>
    </AssignmentStudentCheck>
  )
}