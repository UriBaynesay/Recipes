/*
  Warnings:

  - You are about to drop the column `istagram_link` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "istagram_link",
ADD COLUMN     "instagram_link" TEXT;
