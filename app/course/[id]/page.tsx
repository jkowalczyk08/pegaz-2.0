import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import CourseOptions from "./CourseOptions";
import Link from "next/link";
import CourseDangerZone from "./CourseDangerZone";
import CourseOwnerCheck from "@/components/CourseOwnerCheck";
import CourseUserCheck from "@/components/CourseUserCheck";
import { IoDocumentTextOutline, IoClipboardOutline  } from "react-icons/io5";
import { BumpRecentCourses } from "@/actions/courseActions";

interface Props {
  params: {
    id: string;
  }
}

export default async function CoursePage({ params }: Props) {
  const session = await auth();
  if (!session || session.user === undefined || session.user.id === undefined) {
    redirect('/api/auth/signin');
  }

  const course = await prisma.course.findFirst({
    where: {
      id: params.id
    },
    include: {
      pages: true,
      owners: true,
      students: true
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

  await BumpRecentCourses(session.user.id, course.id)

  return (
    <CourseUserCheck owners={course.owners} students={course.students}>
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
          <CourseOwnerCheck owners={course.owners}>
            <CourseOptions id={course.id}></CourseOptions>
          </CourseOwnerCheck>
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
        <CourseOwnerCheck owners={course.owners}>
          <div className="mt-8 py-4 px-8 border border-gray-200 rounded-3xl shadow-md">
            <h3 className="text-2xl font-medium w-full border-b border-b-slate-100">
              Students
            </h3>
            <div className="mt-2">
              {course.students.map((student) => {
                return <div key={student.id} className="px-4 py-2">
                  {student.email}
                </div>
              })}
            </div>
          </div>
          <CourseDangerZone courseId={course.id}></CourseDangerZone>
        </CourseOwnerCheck>
      </div>
    </CourseUserCheck>
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
        <div className="px-4 flex items-center space-x-2 h-10 rounded-xl
        hover:bg-slate-200">
          {type === 'Note' ? (<IoDocumentTextOutline />) : (<IoClipboardOutline />)}
          <p>
            {name}
          </p>
        </div>
      </Link>
  )
}