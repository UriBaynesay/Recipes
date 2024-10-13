/*
  Warnings:

  - A unique constraint covering the columns `[recipe_id,profile_id]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reviews_profile_id_key";

-- DropIndex
DROP INDEX "Reviews_recipe_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_recipe_id_profile_id_key" ON "Reviews"("recipe_id", "profile_id");
