-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnedCourse" (
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "OwnedCourse_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_organisationId_key" ON "Course"("organisationId");

-- AddForeignKey
ALTER TABLE "OwnedCourse" ADD CONSTRAINT "OwnedCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedCourse" ADD CONSTRAINT "OwnedCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
