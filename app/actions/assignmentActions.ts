'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod'

type SubmitAssignmentFormState = {
  message: string;
}

const submitAssignmentSchema = z.object({
  assignmentId: z.string().min(1),
  solution: z.string().min(1)
})

export async function submitAssignment(formState: SubmitAssignmentFormState, formData: FormData) {
  const session = await auth();
  
  if (!session || !session.user) {
    return {
      message: 'Something went wrong.'
    }
  }

  const request = submitAssignmentSchema.safeParse({
    assignmentId: formData.get('assignmentId') as string,
    solution: formData.get('solution') as string
  })

  if (!request.success) {
    return {
      message: 'Please enter valid solution.'
    }
  }

  const assignment = await prisma.assignment.update({
    where: {
      id: request.data.assignmentId
    },
    data: {
      solution: request.data.solution,
      status: 'submitted',
      submittedAt: new Date().toISOString()
    }
  })

  revalidatePath(`/pages/${assignment.pageId}`)
  redirect(`/pages/${assignment.pageId}`)
}