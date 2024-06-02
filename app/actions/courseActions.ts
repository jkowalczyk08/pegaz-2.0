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

const addUsersSchema = z.object({
  courseId: z.string().min(1),
  emails: z.string().transform(value => {
      const array = value.split(';').map(item => item.trim());
      return array;
    }).refine(value => {
      return Array.isArray(value) && value.every(item => typeof item === 'string');
    }, {
      message: 'Input must be a string of semicolon-separated strings',
    })
})

export async function AddUsers(formState: FormState, formData: FormData) {
  const session = await auth();
  
  if (!session || !session.user) {
    return {
      message: 'Something went wrong.'
    }
  }

  const request = addUsersSchema.safeParse({
    courseId: formData.get('courseId') as string,
    emails: formData.get('emails') as string
  })

  if (!request.success) {
    return {
      message: request.error.message
    }
  }

  const course = await prisma.course.findFirst({
    where: {
      id: request.data.courseId
    },
    include: {
      students: true
    }
  })

  const usersToAdd = await prisma.user.findMany({
    where: {
      email: {
        in: request.data.emails
      }
    }
  })

  if (!course || !usersToAdd) {
    return {
      message: 'Something went wrong.'
    }
  }

  const updatedUsersSet = new Set(course.students)
  usersToAdd.forEach(user => updatedUsersSet.add(user))
  const updatedUsersIds = Array.from(updatedUsersSet).map(user => ({ id: user.id }))

  const updatedCourse = await prisma.course.update({
    where: {
      id: request.data.courseId
    },
    data: {
      students: {
        set: updatedUsersIds
      }
    }
  })

  revalidatePath(`/course/${request.data.courseId}`)
  redirect(`/course/${request.data.courseId}`)
}

const createPageSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  courseId: z.string().min(1),
  description: z.string(),
  deadline: z.string()
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
    description: formData.get('description') as string,
    deadline: formData.get('deadline') as string,
  })

  if (!request.success) {
    return {
      message: 'Please enter valid course data.'
    }
  }

  const course = await prisma.course.findFirst({
    where: {
      id: request.data.courseId
    },
    include: {
      students: true
    }
  })

  if (!course) {
    return {
      message: 'Something went wrong.'
    }
  }

  const page = await prisma.page.create({
    data: {
      name: request.data.name,
      type: request.data.type,
      courseId: request.data.courseId,
      description: request.data.description,
      deadline: request.data.deadline === '' ? null : request.data.deadline,
      assignments: {
        create: course.students.map(student => ({
          userId: student.id,
          status: 'pending',
          grade: ''
        })),
      }
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