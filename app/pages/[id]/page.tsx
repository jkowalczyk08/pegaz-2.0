import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import PageOptions from "./PageOptions";

interface Props {
  params: {
    id: string
  }
}

export default async function CoursePage({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  if (session.user == undefined || !isAuthorized(session.user)) {
    return (
      <div className="py-16 flex items-center justify-center">
        <h3 className="text-xl font-semibold">
          {"You don't have access to this page."}
        </h3>
      </div>
    )
  }

  const page = await prisma.page.findFirst({
    where: {
      id: params.id
    }
  })

  if (page == null) {
    return (
      <div className="py-16 flex items-center justify-center">
        <h3 className="text-xl font-semibold">
          {"Something went wrong."}
        </h3>
      </div>
    )
  }

  return (
    <div className="py-8 px-12">
      <div className="flex items-center">
        <div>
          <h2 className="text-3xl font-bold">
            {page.name}
          </h2>
        </div>
        <div className="grow">
        </div>
        <PageOptions id={page.id} courseId={page.id}></PageOptions>
      </div>
      <div className="mt-8 py-4 px-8 border border-gray-200 rounded-3xl whitespace-pre-line shadow-md">
        {page.description}
      </div>
    </div>
  )
}

function isAuthorized(user: User) {
  return true;
}