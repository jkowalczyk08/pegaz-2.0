import { auth } from "@/auth";
import { Assignment } from "@prisma/client";
import { User } from "next-auth";

export default async function AssignmentStudentCheck({ children, assignment }: { children: React.ReactNode, assignment: Assignment}) {
  const session = await auth();

  if (!session) {
    return <></>
  }

  if (session.user == undefined || assignment.userId != session.user.id) {
    return <></>
  }

  return (
    <>{children}</>
  )
}