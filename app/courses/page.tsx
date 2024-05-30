import { auth } from '@/auth';
import CourseCard from '@/courses/CourseCard';
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation';
import NewCourseForm from '../newCourse/NewCourseForm';
import NewCourseSection from './NewCourseSection';
import Link from 'next/link';

export default async function Courses() {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  const courses = await prisma.course.findMany();
  const userEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
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
            className='px-3 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 focus:outline-none shadow-md'
            href={'/newCourse'}
          >
            Create new course
          </Link>
        </div>
      </div>
      <div className='px-4 py-8 grid grid-cols-4 gap-4'>
        {courses.map((course) => {
          return <CourseCard key={course.id} {...course}/>
        })}
      </div>
    </div>
  )
}