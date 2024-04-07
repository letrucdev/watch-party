import { CookiesKeys } from "@lib/constants";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
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
        const party = await prisma.partyRoom.findUniqueOrThrow({
            select: {
                ownerId: true,
                partyId: true,
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
                partyPlaylist: {
                    select: {
                        id: true,
                        video: true,
                    },
                },
            },
            where: { partyId },
        });

        return NextResponse.json(party);
    } catch (error) {
        return NextResponse.json(
            { message: "Lỗi" },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}
