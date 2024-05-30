/*
  Warnings:

  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OwnedCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "OwnedCourse" DROP CONSTRAINT "OwnedCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "OwnedCourse" DROP CONSTRAINT "OwnedCourse_userId_fkey";

-- DropTable
DROP TABLE "Enrollment";

-- DropTable
DROP TABLE "OwnedCourse";

-- CreateTable
CREATE TABLE "_CourseOwners" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseStudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseOwners_AB_unique" ON "_CourseOwners"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseOwners_B_index" ON "_CourseOwners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseStudents_AB_unique" ON "_CourseStudents"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseStudents_B_index" ON "_CourseStudents"("B");

-- AddForeignKey
ALTER TABLE "_CourseOwners" ADD CONSTRAINT "_CourseOwners_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseOwners" ADD CONSTRAINT "_CourseOwners_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseStudents" ADD CONSTRAINT "_CourseStudents_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseStudents" ADD CONSTRAINT "_CourseStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
