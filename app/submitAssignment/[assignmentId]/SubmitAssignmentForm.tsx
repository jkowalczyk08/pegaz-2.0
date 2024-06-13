'use client'

import { submitAssignment } from "@/actions/assignmentActions"
import { SubmitButton } from "@/components/buttons"
import Link from "next/link"
import { useFormState } from "react-dom"

interface Props {
  assignmentId: string,
  pageId: string
}

const initialState = {
  message: '',
}

export default function SumbitAssignmentForm( {assignmentId, pageId }: Props) {
  const [state, formAction] = useFormState(submitAssignment, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="assignmentId" value={assignmentId} />
      <div className="mb-6">
          {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label> */}
          <textarea rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="solution"/>
      </div>
      <div className="flex space-x-8">
          <Link
            className="w-28 border border-rose-600 text-rose-600 hover:bg-slate-100 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline text-center"
            href={`/pages/${pageId}`}
          >
            Cancel
          </Link>
          <SubmitButton action="Submit" pendingAction="Submitting"/>
        </div>
        <p aria-live="polite" className="py-4 text-red-500"></p>
    </form>
  )
}