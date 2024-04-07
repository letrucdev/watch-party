import { CookiesKeys } from "@lib/constants";
import jwt from "@lib/jwt";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
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
        const userExit = await prisma.partyParticipants.delete({
            where: { partyId, participantId: payload?.userId as number },
        });

        const participantsCount = await prisma.partyParticipants.count({
            where: {
                partyId,
            },
        });

        if (participantsCount < 1) {
            await prisma.partyPlaylist.deleteMany({
                where: {
                    partyId,
                },
            });
            await prisma.partyRoom.delete({
                where: {
                    partyId,
                },
            });
        }

        return NextResponse.json({
            message: "Thoát phòng thành công",
        });
    } catch (error) {
        return NextResponse.json({ message: "Thoát phòng thất bại" });
    }
}
