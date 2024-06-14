import { Assignment, User } from "@prisma/client";

interface SolutionProps {
  userAssignment: Assignment,
  user?: User
}

export default async function Solution({ userAssignment, user }: SolutionProps) {
  if (userAssignment.status === "pending" && user === undefined) {
    return <></>
  }

  return (
      <div className="mt-8 py-4 px-8 border border-gray-200 rounded-3xl shadow-md">
        <h3 className="pt-4 text-2xl font-medium w-full border-b border-b-slate-100">
          Solution
        </h3>
        <div className="py-2">
          {userAssignment.solution}
        </div>
        <div className="pt-4 text-gray-500 dark:text-gray-400 flex flex-col space-y-1">
          {user !== undefined && (
            <p>{user.email}</p>
          )}
          {userAssignment.status === 'pending' && (
            <p>pending</p>
          )}
          {userAssignment.submittedAt !== null && (
            <p>{`submitted at ${userAssignment.submittedAt}`}</p>
          )}
          {userAssignment.grade !== '' && (
            <p>{`grade: ${userAssignment.grade}`}</p>
          )}
        </div>
      </div>
  )
}