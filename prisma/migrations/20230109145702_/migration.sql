/*
  Warnings:

  - You are about to drop the column `year` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "year",
ADD COLUMN     "year3" INTEGER DEFAULT 2023;
