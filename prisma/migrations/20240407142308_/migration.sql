/*
  Warnings:

  - A unique constraint covering the columns `[participantId]` on the table `PartyParticipants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PartyParticipants_participantId_key" ON "PartyParticipants"("participantId");
