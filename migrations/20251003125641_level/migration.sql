/*
  Warnings:

  - Changed the type of `difficulty` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('Medium', 'Hard', 'Easy');

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "public"."Difficulty" NOT NULL;
