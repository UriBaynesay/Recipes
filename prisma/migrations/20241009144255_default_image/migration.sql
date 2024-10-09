/*
  Warnings:

  - Made the column `profile_image` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "profile_image" SET NOT NULL,
ALTER COLUMN "profile_image" SET DEFAULT 'https://i.ibb.co/0h7yZjx/user-1.png';
