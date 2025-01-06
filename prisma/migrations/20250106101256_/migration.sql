/*
  Warnings:

  - Made the column `description` on table `Film` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Film" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "baseLanguage" TEXT NOT NULL,
    "homeCountry" TEXT NOT NULL,
    "ageRestriction" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Film" ("ageRestriction", "baseLanguage", "description", "homeCountry", "id", "name", "rating", "src", "year") SELECT "ageRestriction", "baseLanguage", "description", "homeCountry", "id", "name", "rating", "src", "year" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_name_key" ON "Film"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
