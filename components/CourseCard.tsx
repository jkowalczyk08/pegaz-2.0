import Link from "next/link";

interface Props {
  id: string;
  name: string;
  organisationId: string;
}

export default function CourseCard({ id, name, organisationId }: Props) {
  return ( 
    <Link href="/course/${id}" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-500 dark:text-gray-400">
        {organisationId}
      </p>
    </Link>
  )
}