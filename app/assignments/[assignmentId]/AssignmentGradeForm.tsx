'use client'

import { gradeAssignment } from "@/actions/assignmentActions"
import { SubmitButton } from "@/components/buttons"
import { useFormState } from "react-dom"

interface AssignmentGradeFormProps {
  assignmentId: string
}

const initialState = {
  message: '',
}

export default function AssignmentGradeForm({ assignmentId }: AssignmentGradeFormProps) {
  const [state, formAction] = useFormState(gradeAssignment, initialState)

  return (
    <form action={formAction} className="pt-8 px-8">
      <input type="hidden" name="assignmentId" value={assignmentId} />
      <div className="flex flex-row space-x-10 items-center">
        <input className="w-32 shadow appearance-none border rounded-lg text-center py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="grade" type="text" placeholder="enter grade"/>
        <SubmitButton action="Set Grade" pendingAction="Grading"/>
      </div>
    </form>
  )
}