/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Film` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Film" ADD COLUMN "src" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Film_name_key" ON "Film"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");
