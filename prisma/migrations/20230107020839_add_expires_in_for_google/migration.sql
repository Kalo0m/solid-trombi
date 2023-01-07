/*
  Warnings:

  - You are about to drop the column `photo` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN "expires_in" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "firstname" TEXT,
    "lastname" TEXT
);
INSERT INTO "new_User" ("email", "emailVerified", "firstname", "id", "image", "lastname", "name") SELECT "email", "emailVerified", "firstname", "id", "image", "lastname", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
