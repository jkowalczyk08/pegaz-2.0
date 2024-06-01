'use client'

import { DeleteCourse } from "@/actions/courseActions"

interface Props {
  courseId: string
}

export default function DeleteButton({ courseId }: Props) {
  return (
    <button
      className="w-36 bg-rose-600 hover:bg-rose-700 text-white
        font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline
        text-center"
      onClick={async () => {
        await DeleteCourse(courseId)
      }}
      >
      Delete Course
    </button>
  )
}