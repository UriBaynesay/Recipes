/*
  Warnings:

  - You are about to drop the column `photos_url` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "photos_url",
DROP COLUMN "video_url";
