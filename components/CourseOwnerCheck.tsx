import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { User } from "next-auth";

export default async function CourseOwnerCheck({ children, owners }: { children: React.ReactNode, owners: User[]}) {
  const session = await auth();

  if (!session) {
    return <></>
  }

  if (session.user == undefined || !(owners.some(user => user.id === session!.user!.id))) {
    return <></>
  }

  return (
    <>{children}</>
  )
}