import { auth } from '@/auth';
import CourseCard from '@/courses/CourseCard';
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Courses() {
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

  const courses = await prisma.course.findMany({
    where: {
      OR: [
        { students: { some: { id: userId}}},
        { owners: { some: { id: userId}}}
      ]
    }
  });

  return (
    <div className='px-12 py-6'>
      <div className='flex flex-row items-center'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Your courses
          </h2>
        </div>
        <div className='grow'></div>
        <div>
          <Link
            className="w-36 bg-rose-600 hover:bg-rose-700 text-white
              font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline
              text-center"
            href={'/newCourse'}
          >
            Create new course
          </Link>
        </div>
      </div>
      <div className='px-4 py-8 grid grid-cols-4 gap-4'>
        {courses.map((course) => {
          return (<CourseCard key={course.id} {...course}/>)
        })}
      </div>
    </div>
  )
}