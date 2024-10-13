/*
  Warnings:

  - You are about to drop the column `image_url` on the `Reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "image_url",
ADD COLUMN     "image" TEXT;
