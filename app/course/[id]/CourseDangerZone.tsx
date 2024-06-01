import { auth } from "@/auth";
import { User } from "next-auth";
import DeleteButton from "./DeleteButton";

interface Props {
  courseId: string
}

export default async function CourseOptions({ courseId } : Props) {
  const session = await auth()

  if (session == null || session.user == undefined || !isOwner(session.user)) {
    return (
      <div>
      </div>
    )
  }

  return (
    <div className="mt-8 px-4 w-full border-t-2 border-t-slate-200">
      <h3 className="my-4 text-2xl font-bold">
        Danger Zone
      </h3>
      <div className="px-2 flex items-center space-x-8">
        <DeleteButton courseId={courseId}></DeleteButton>
      </div>
    </div>
  )
}

function isOwner(user: User) {
  return true;
}