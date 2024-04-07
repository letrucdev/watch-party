import { CookiesKeys } from "@lib/constants";
import jwt from "@lib/jwt";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { AddVideoToPlaylistSchema, IAddVideoToPlaylist } from "../schema/Api";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const token = request.cookies.get(CookiesKeys.accessToken)?.value;
    const requestBody: IAddVideoToPlaylist = await request.json();
    const video = requestBody;

    const validate = await AddVideoToPlaylistSchema.safeParseAsync(requestBody);

    if (!token) {
        return NextResponse.json(
            { message: "Không có token được gửi lên" },
            { status: HttpStatusCode.Unauthorized }
        );
    }

    if (!validate.success) {
        const formattedError = validate.error.flatten().fieldErrors;
        return Response.json(formattedError, {
            status: HttpStatusCode.BadRequest,
        });
    }

    try {
        const payload = await jwt.VerifyToken(token);
        const partyId = randomUUID();

        await prisma.partyRoom.create({
            data: {
                partyId,
                ownerId: payload?.userId as number,
                partyPlaylist: {
                    create: {
                        video,
                    },
                },
            },
        });

        return NextResponse.json(
            {
                message: "Tạo phòng tiệc thành công",
                partyId,
            },
            { status: HttpStatusCode.Created }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Tạo phòng tiệc thất bại",
            },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}
