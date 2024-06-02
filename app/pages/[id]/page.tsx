import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import PageOptions from "./PageOptions";
import Link from "next/link";
import CourseOwnerCheck from "@/components/CourseOwnerCheck";
import CourseUserCheck from "@/components/CourseUserCheck";

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

  const page = await prisma.page.findFirst({
    where: {
      id: params.id
    },
    include: {
      course: {
        include: {
          owners: true,
          students: true
        }
      }
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
    <CourseUserCheck owners={page.course.owners} students={page.course.students}>
      <div className="py-8 px-12">
        <div className="flex items-center">
          <div>
            <h2 className="text-3xl font-bold">
              {page.name}
            </h2>
          </div>
          <div className="grow">
          </div>
          <Link
              className="w-40 border border-rose-600 text-rose-600 hover:bg-slate-100 font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline text-center"
              href={`/course/${page.courseId}`}
            >
              Back to Course
          </Link>
        </div>
        <div className="mt-8 py-4 px-8 border border-gray-200 rounded-3xl whitespace-pre-line shadow-md">
          {page.description}
        </div>
        <CourseOwnerCheck owners={page.course.owners}>
          <PageOptions id={page.id} courseId={page.id}></PageOptions>
        </CourseOwnerCheck>
      </div>
    </CourseUserCheck>
  )
}

function isAuthorized(user: User) {
  return true;
}