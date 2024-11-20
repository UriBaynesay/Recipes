/*
  Warnings:

  - You are about to drop the column `facebook_link` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `instagram_link` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `x_link` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "facebook_link",
DROP COLUMN "instagram_link",
DROP COLUMN "x_link";
