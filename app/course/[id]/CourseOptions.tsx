import { auth } from "@/auth";
import { User } from "next-auth";
import Link from "next/link";

interface Props {
  id: string
}

export default async function CourseOptions({ id } : Props) {
  const session = await auth()

  if (session == null || session.user == undefined || !isOwner(session.user)) {
    return (
      <div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-8">
      <Link
        href={`/newPage/${id}`}
        className="w-32 bg-rose-600 hover:bg-rose-700 text-white
          font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline
          text-center">
        Add Page
      </Link>
      <Link
        className="w-32 bg-rose-600 hover:bg-rose-700 text-white
        font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline
        text-center"
        href={`course/${id}/settings`}
      >
        Add Users
      </Link>
    </div>
  )
}

function isOwner(user: User) {
  return true;
}