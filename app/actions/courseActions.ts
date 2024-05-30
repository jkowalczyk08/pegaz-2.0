'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod'


type FormState = {
  message: string;
}

const createCourseSchema = z.object({
  name: z.string().min(1, "Course name cannot be empty."),
  organisationId: z.string().min(1, "Course organisation Id cannot be empty.")
})

export async function CreateCourse(formState: FormState, formData: FormData) {
  const session = await auth();
  
  if (!session || !session.user) {
    return {
      message: 'Something went wrong.'
    }
  }
  
  const request = createCourseSchema.safeParse({
    name: formData.get('name') as string,
    organisationId: formData.get('organisationId') as string
  })

  if (!request.success) {
    console.log(request)
    return {
      message: 'Please enter valid course data.'
    }
  }

  const course = await prisma.course.create({
    data: {
      name: request.data.name,
      organisationId: request.data.organisationId,
      owners: {
        connect: {id: session.user.id },
      }
    }
  });

  revalidatePath('/courses')
  redirect('/courses')
}