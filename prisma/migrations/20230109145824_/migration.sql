/*
  Warnings:

  - You are about to drop the column `year3` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "year3",
ADD COLUMN     "year" INTEGER DEFAULT 2023;
