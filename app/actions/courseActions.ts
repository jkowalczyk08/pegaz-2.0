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

export async function DeleteCourse(courseId: string) {
  const session = await auth();
  
  if (!session || !session.user) {
    return {
      message: 'Something went wrong.'
    }
  }

  const course = await prisma.course.delete({
    where: {
      id: courseId
    }
  })

  revalidatePath(`/courses`)
  redirect(`/courses`)
}

const createPageSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  courseId: z.string().min(1),
  description: z.string()
})

export async function CreatePage(formState: FormState, formData: FormData) {
  const session = await auth();
  
  if (!session || !session.user) {
    return {
      message: 'Something went wrong.'
    }
  }

  const request = createPageSchema.safeParse({
    name: formData.get('name') as string,
    type: formData.get('type') as string,
    courseId: formData.get('courseId') as string,
    description: formData.get('description') as string
  })

  if (!request.success) {
    return {
      message: 'Please enter valid course data.'
    }
  }

  const page = await prisma.page.create({
    data: {
      name: request.data.name,
      type: request.data.type,
      courseId: request.data.courseId,
      description: request.data.description
    }
  })

  revalidatePath(`/course/${request.data.courseId}`)
  redirect(`/course/${request.data.courseId}`)
}

export async function DeletePage(pageId: string) {
  const session = await auth();
  
  if (!session || !session.user) {
    return {
      message: 'Something went wrong.'
    }
  }

  const page = await prisma.page.delete({
    where: {
      id: pageId
    }
  })

  revalidatePath(`/course/${page.courseId}`)
  redirect(`/course/${page.courseId}`)
}