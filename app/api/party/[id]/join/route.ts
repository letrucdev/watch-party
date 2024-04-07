import { CookiesKeys } from "@lib/constants";
import jwt from "@lib/jwt";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const token = request.cookies.get(CookiesKeys.accessToken)?.value;
    const partyId = params.id;

    if (!token) {
        return NextResponse.json(
            { message: "Không có token được gửi lên" },
            { status: HttpStatusCode.Unauthorized }
        );
    }

    try {
        const payload = await jwt.VerifyToken(token);

        const joinParty = await prisma.partyParticipants.create({
            data: { partyId, participantId: payload?.userId as number },
        });

        const party = await prisma.partyRoom.findUnique({
            where: { partyId: joinParty.partyId },
            include: {
                partyPlaylist: {
                    select: { video: true },
                },
                partyParticipants: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                displayName: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            message: "Vào phòng tiệc thành công",
            party,
        });
    } catch (error) {
        throw error;
    }
}
