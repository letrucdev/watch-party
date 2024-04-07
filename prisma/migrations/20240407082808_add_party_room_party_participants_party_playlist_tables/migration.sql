-- CreateTable
CREATE TABLE "PartyRoom" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "PartyRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyParticipants" (
    "id" SERIAL NOT NULL,
    "partyId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "PartyParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyPlaylist" (
    "id" SERIAL NOT NULL,
    "partyId" INTEGER NOT NULL,
    "video" JSONB NOT NULL,

    CONSTRAINT "PartyPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartyRoom_ownerId_key" ON "PartyRoom"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "PartyParticipants_partyId_key" ON "PartyParticipants"("partyId");

-- CreateIndex
CREATE UNIQUE INDEX "PartyParticipants_participantId_key" ON "PartyParticipants"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "PartyPlaylist_partyId_key" ON "PartyPlaylist"("partyId");

-- AddForeignKey
ALTER TABLE "PartyRoom" ADD CONSTRAINT "PartyRoom_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyParticipants" ADD CONSTRAINT "PartyParticipants_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "PartyRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyParticipants" ADD CONSTRAINT "PartyParticipants_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyPlaylist" ADD CONSTRAINT "PartyPlaylist_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "PartyRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
