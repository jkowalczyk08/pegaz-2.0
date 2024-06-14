import { createCourse, populateUsers } from "@/actions/adminActions";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function AdminPanel() {
  return (
    <AdminCheck>
      <div className="py-8 px-12">
        <div className="flex items-center">
          <div>
            <h2 className="text-3xl font-bold">
              Admin Panel
            </h2>
            <p className="text-gray-500">
              Set isAdmin flag to True in the Database to become an admin
            </p>
          </div>
        </div>
        <div className="py-8 flex flex-col space-y-4">
          <form action={populateUsers} className="flex items-center space-x-4">
            <button
              className="w-48 bg-rose-600 hover:bg-rose-700 text-white
                font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline
                text-center"
            >
              Populate Users
            </button>
            <p className="text-gray-500">
              Adds a few random users
            </p> 
          </form>
          <form action={createCourse} className="flex items-center space-x-4">
            <button
              className="w-48 bg-rose-600 hover:bg-rose-700 text-white
                font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline
                text-center"
            >
              Create Course
            </button>
            <p className="text-gray-500">
              Creates a course and adds some users
            </p>
          </form>
          {/* <form action={enrollInACourse} className="flex items-center space-x-4">
            <button
              className="w-48 bg-rose-600 hover:bg-rose-700 text-white
                font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline
                text-center"
            >
              Enroll in a Course
            </button>
            <p className="text-gray-500">
              Creates a course where you are not the owner
            </p>
          </form> */}
        </div>
      </div>
    </AdminCheck>
  )
}

async function AdminCheck({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  if (session.user === undefined) {
    return <></>
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id
    }
  })

  if (user === null || !user.isAdmin) {
    return <></>
  }

  return (
    <>{children}</>
  )
}