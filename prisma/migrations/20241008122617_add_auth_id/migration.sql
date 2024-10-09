/*
  Warnings:

  - A unique constraint covering the columns `[auth_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_email_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "auth_id" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_auth_id_key" ON "Profile"("auth_id");
