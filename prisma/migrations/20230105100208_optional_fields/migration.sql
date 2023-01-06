-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "photo" TEXT
);
INSERT INTO "new_User" ("email", "emailVerified", "firstname", "id", "image", "lastname", "name", "photo") SELECT "email", "emailVerified", "firstname", "id", "image", "lastname", "name", "photo" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
