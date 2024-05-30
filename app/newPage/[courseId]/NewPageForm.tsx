'use client'
import { CreatePage } from "@/actions/courseActions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/buttons";
import { useState } from "react";

interface Props {
  courseId: string
}

const initialState = {
  message: '',
}

export default function NewPageForm({ courseId }: Props) {
  const [state, formAction] = useFormState(CreatePage, initialState)
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="px-64 w-full space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">
        Create new page
      </h2>
      <form action={formAction}>
        <input type="hidden" name="courseId" value={courseId} />
        <div className="flex flex-row space-x-10">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Type
            </label>
            <select
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              required
              className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Note">Note</option>
              <option value="Task">Task</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="description"/>
        </div>
        <div className="flex space-x-8">
          <Link
            className="w-28 border border-rose-600 text-rose-600 hover:bg-slate-100 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline text-center"
            href={`/course/${courseId}`}
          >
            Cancel
          </Link>
          <SubmitButton/>
        </div>
        <p aria-live="polite" className="py-4 text-red-500">
          {state?.message}
        </p>
      </form>
    </div>
  )
}
