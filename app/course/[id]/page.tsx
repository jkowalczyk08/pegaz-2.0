import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import CourseOptions from "./CourseOptions";
import Link from "next/link";

interface Props {
  params: {
    id: string;
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
          {"You don't have access to this course."}
        </h3>
      </div>
    )
  }

  const course = await prisma.course.findFirst({
    where: {
      id: params.id
    },
    include: {
      pages: true
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
    <div className="py-8 px-12">
      <div className="flex items-center">
        <div>
          <h2 className="text-3xl font-bold">
            {course.name}
          </h2>
          <p className="font-normal text-gray-500 dark:text-gray-400">
            {course.organisationId}
          </p>
        </div>
        <div className="grow">
        </div>
        <CourseOptions id={course.id}></CourseOptions>
      </div>
      <div className="mt-8 py-4 px-8 border border-gray-200 rounded-3xl shadow-md">
        <h3 className="text-2xl font-medium w-full border-b border-b-slate-100">
          Pages
        </h3>
        <div className="mt-2">
          {course.pages.map((page) => {
            return <PageCard key={page.id} id={page.id} name={page.name} type={page.type}></PageCard>
          })}
        </div>
      </div>
    </div>
  )
}

interface PageProps {
  id: string,
  name: string,
  type: string
}

function PageCard({ id, name, type } : PageProps) {
  return (
      <Link
        
        href={`/pages/${id}`}
      >
        <p className="px-4 flex items-center h-10 rounded-xl
        hover:bg-slate-200">
          {name}
        </p>
      </Link>
  )
}

function isAuthorized(user: User) {
  return true;
}