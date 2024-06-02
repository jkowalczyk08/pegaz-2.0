import { auth } from "@/auth";
import { User } from "next-auth";

export default async function CourseStudentCheck({ children, students }: { children: React.ReactNode, students: User[]}) {
  const session = await auth();

  if (!session) {
    return <></>
  }

  if (session.user == undefined || !(students.some(user => user.id === session!.user!.id))) {
    return <></>
  }

  return (
    <>{children}</>
  )
}