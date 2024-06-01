import { auth } from "@/auth";
import { User } from "next-auth";

export default async function CourseUserCheck({ children, owners, students }: { children: React.ReactNode, owners: User[], students: User[]}) {
  const session = await auth();

  if (!session) {
    return (
      <div className="py-16 flex items-center justify-center">
        <h3 className="text-xl font-semibold">
          {"You don't have access to this course."}
        </h3>
      </div>
    )
  }

  if (session.user == undefined || (!isStudent(session.user, students) && !isOwner(session.user, owners))) {
    return (
      <div className="py-16 flex items-center justify-center">
        <h3 className="text-xl font-semibold">
          {"You don't have access to this course."}
        </h3>
      </div>
    )
  }

  return (
    <>{children}</>
  )
}

function isStudent(user: User, students: User[]) {
  return students.some(student => student.id === user.id)
}

function isOwner(user: User, owners: User[]) {
  return owners.some(owner => owner.id === user.id)
}
