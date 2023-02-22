/*
  Warnings:

  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Plan` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Plan" "PlanType" NOT NULL;

-- DropTable
DROP TABLE "Plan";
