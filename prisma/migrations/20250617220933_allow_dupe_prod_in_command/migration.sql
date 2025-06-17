/*
  Warnings:

  - The primary key for the `commandeproduit` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "commandeproduit" DROP CONSTRAINT "commandeproduit_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "commandeproduit_pkey" PRIMARY KEY ("id");
