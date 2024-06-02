'use client'
import { AddUsers } from "@/actions/courseActions";
import { SubmitButton } from "@/components/buttons";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

interface Props {
  courseId: string
}

const initialState = {
  message: '',
}

export default function AddUsersForm({ courseId }: Props) {
  const [state, formAction] = useFormState(AddUsers, initialState)

  return (
    <div className="px-64 w-full space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">
        Add Users
      </h2>
      <form action={formAction}>
        <input type="hidden" name="courseId" value={courseId} />
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emails">
            Users
          </label>
          <textarea
            placeholder="Type user emails separated by semicolon"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="emails"/>
        </div>
        <div className="flex space-x-8">
          <Link
            className="w-28 border border-rose-600 text-rose-600 hover:bg-slate-100 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline text-center"
            href={`/course/${courseId}`}
          >
            Cancel
          </Link>
          <SubmitButton action="Add" pendingAction="Adding"/>
        </div>
        <p aria-live="polite" className="py-4 text-red-500">
          {state?.message}
        </p>
      </form>
    </div>
  )
}