'use client'
import { CreateCourse } from "@/actions/courseActions";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "@/components/buttons";

const initialState = {
  message: '',
}

export default function NewCourseForm() {
  const [state, formAction] = useFormState(CreateCourse, initialState)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">
        Create new course
      </h2>
      <form action={formAction}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" defaultValue=''/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organisationId" defaultValue=''>
            Organisation Id
          </label>
          <input className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="organisationId" type="text"/>
        </div>
        <div className="flex items-center justify-between">
          <Link
            className="w-28 border border-rose-600 text-rose-600 hover:bg-slate-100 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline text-center"
            href="/courses"
          >
            Cancel
          </Link>
          <SubmitButton action="Create" pendingAction="Creating"/>
        </div>
        <p aria-live="polite" className="py-4 text-red-500">
          {state?.message}
        </p>
      </form>
    </div>
  )
}
