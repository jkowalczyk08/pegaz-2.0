/*
  Warnings:

  - Made the column `deadline` on table `Page` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "deadline" SET NOT NULL,
ALTER COLUMN "deadline" SET DATA TYPE TEXT;
