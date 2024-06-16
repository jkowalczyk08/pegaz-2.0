import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PageOptions from "./PageOptions";
import Link from "next/link";
import CourseOwnerCheck from "@/components/CourseOwnerCheck";
import CourseUserCheck from "@/components/CourseUserCheck";
import CourseStudentCheck from "@/components/CourseStudentCheck";
import Deadline from "@/components/Deadline";
import Solution from "@/components/Solution";
import { BumpRecentCourses } from "@/actions/courseActions";

interface Props {
  params: {
    id: string
  }
}

export default async function CoursePage({ params }: Props) {
  const session = await auth();
  if (!session || session.user === undefined || session.user.id === undefined) {
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
      },
      assignments: {
        include: {
          user: true
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

  await BumpRecentCourses(session.user.id, page.course.id)

  const userAssignment = page.assignments.find(a => a.userId === session.user?.id)

  return (
    <CourseUserCheck owners={page.course.owners} students={page.course.students}>
      <div className="py-8 px-12">
        <div className="flex items-center">
          <div>
            <h2 className="text-3xl font-bold">
              {page.name}
            </h2>
            <Deadline pageType={page.type} deadline={page.deadline}></Deadline>
          </div>
          <div className="grow">
          </div>
          <div className="flex items-center space-x-8">
            <CourseStudentCheck students={page.course.students}>
              {(page.type === 'Task' && userAssignment ) && (
                <Link
                  href={`/submitAssignment/${userAssignment.id}`}
                  className="w-48 bg-rose-600 hover:bg-rose-700 text-white
                  font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline
                  text-center"
                >
                  Submit Assignment
                </Link>
              )}
            </CourseStudentCheck>
            <Link
                className="w-40 border border-rose-600 text-rose-600 hover:bg-slate-100 font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline text-center"
                href={`/course/${page.courseId}`}
              >
                Back to Course
            </Link>
          </div>
        </div>
        <div className="mt-8 py-4 px-8 border border-gray-200 rounded-3xl whitespace-pre-line shadow-md">
          {page.description}
        </div>
        <CourseStudentCheck students={page.course.students}>
          {(page.type === 'Task' && userAssignment) && (
            <Solution userAssignment={userAssignment}/>
          )
          }
        </CourseStudentCheck>
        <CourseOwnerCheck owners={page.course.owners}>
          {page.type === 'Task' && (
              <div className="mt-8 py-4 px-8 border border-gray-200 rounded-3xl shadow-md">
                <h3 className="text-2xl font-medium w-full border-b border-b-slate-100">
                  Assignments
                </h3>
                <div className="mt-2">
                  {page.assignments.map((assignment) => {
                    return (
                      <Link
                        href={`/assignments/${assignment.id}`} key={assignment.id}
                        className="px-4 flex items-center h-10 rounded-xl hover:bg-slate-200"
                      >
                        <div className="w-96">
                          {assignment.user.email}
                        </div>
                        <div>
                          {assignment.status}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          }
          <PageOptions id={page.id} courseId={page.id}></PageOptions>
        </CourseOwnerCheck>
      </div>
    </CourseUserCheck>
  )
}