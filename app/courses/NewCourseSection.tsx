import Link from "next/link";

export default function NewCourseSection() {
  return (
    <div>
      <Link
      className='px-3 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 focus:outline-none shadow-md'
      href={'/newCourse'}
      >
        Create new course
      </Link>
    </div>
  );
}