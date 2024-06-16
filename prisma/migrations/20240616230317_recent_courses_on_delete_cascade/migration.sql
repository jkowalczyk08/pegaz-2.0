-- DropForeignKey
ALTER TABLE "RecentCourses" DROP CONSTRAINT "RecentCourses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "RecentCourses" DROP CONSTRAINT "RecentCourses_userId_fkey";

-- AddForeignKey
ALTER TABLE "RecentCourses" ADD CONSTRAINT "RecentCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentCourses" ADD CONSTRAINT "RecentCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
