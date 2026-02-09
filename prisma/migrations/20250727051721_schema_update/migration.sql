/*
  Warnings:

  - You are about to drop the column `fileType` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `digitalScore` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `gardenScore` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `heatingScore` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `homeScore` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `petsScore` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "fileType",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'weekly';

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "digitalScore",
DROP COLUMN "gardenScore",
DROP COLUMN "heatingScore",
DROP COLUMN "homeScore",
DROP COLUMN "petsScore";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
