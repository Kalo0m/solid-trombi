-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('Front', 'Back', 'Math', 'SSG', 'Coq', 'Anglais');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tags" "Tag"[];
