/*
  Warnings:

  - A unique constraint covering the columns `[partyId]` on the table `PartyRoom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `partyId` to the `PartyRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PartyParticipants" DROP CONSTRAINT "PartyParticipants_partyId_fkey";

-- DropForeignKey
ALTER TABLE "PartyPlaylist" DROP CONSTRAINT "PartyPlaylist_partyId_fkey";

-- DropIndex
DROP INDEX "PartyParticipants_partyId_key";

-- DropIndex
DROP INDEX "PartyPlaylist_partyId_key";

-- AlterTable
ALTER TABLE "PartyParticipants" ALTER COLUMN "partyId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PartyPlaylist" ALTER COLUMN "partyId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PartyRoom" ADD COLUMN     "partyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PartyRoom_partyId_key" ON "PartyRoom"("partyId");

-- AddForeignKey
ALTER TABLE "PartyParticipants" ADD CONSTRAINT "PartyParticipants_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "PartyRoom"("partyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyPlaylist" ADD CONSTRAINT "PartyPlaylist_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "PartyRoom"("partyId") ON DELETE RESTRICT ON UPDATE CASCADE;
