-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
