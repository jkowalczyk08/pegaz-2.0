import { auth } from "@/auth";
import Deadline from "@/components/Deadline";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  if (session.user?.id == undefined) {
    return (
      <div className="py-16 flex items-center justify-center">
        <h3 className="text-xl font-semibold">
          {"Something went wrong."}
        </h3>
      </div>
    )
  }

  const userId = session!.user!.id!;

  const pendingAssignments = await prisma.assignment.findMany({
    where: {
      userId: userId,
      status: 'pending'
    },
    include: {
      page: {
        select: {
          name: true,
          deadline: true,
          course: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      page: {
        deadline: 'asc'
      } 
    }
  })

  const recentCourses = await prisma.recentCourses.findMany({
    where: {
      userId: userId,
    },
    include: {
      course: true
    },
    orderBy: {
      accessedAt: 'desc'
    }
  })

  return (
    <div className='px-12 py-6'>
      <div className='flex flex-row items-center'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Recent courses
          </h2>
        </div>
      </div>
      <div className='px-4 py-8 grid grid-cols-3 gap-4'>
        {recentCourses.map((course) => {
          return <RecentCourseCard
            key={course.courseId}
            name={course.course.name}
            courseId={course.courseId}
          />
        })}
      </div>
      <div className='mt-8 flex flex-row items-center'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Pending Assignments
          </h2>
        </div>
      </div>
      <div className='px-4 py-8 grid grid-cols-3 gap-4'>
        {pendingAssignments.map((assignment) => {
          return (
          <AssignmentCard
            key={assignment.id}
            name={assignment.page.name}
            courseName={assignment.page.course.name}
            deadline={assignment.page.deadline}
            pageId={assignment.pageId}
            />)
        })}
      </div>
    </div>
  )
}

interface RecentCourseProps {
  name: string,
  courseId: string
}

function RecentCourseCard({ name, courseId }: RecentCourseProps) {
  return (
    <Link href={`/course/${courseId}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
    </Link>
  )
}

interface AssignmentCardProps {
  name: string,
  courseName: string,
  deadline: string | null,
  pageId: string
}

function AssignmentCard({ name, courseName, deadline, pageId}: AssignmentCardProps) {
  return (
    <Link href={`/pages/${pageId}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <h3 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
        {courseName}
      </h3>
      <Deadline pageType="Task" deadline={deadline}></Deadline>
    </Link>
  )  
}