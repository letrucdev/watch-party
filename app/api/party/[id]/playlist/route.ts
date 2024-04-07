import {
    AddVideoToPlaylistSchema,
    IAddVideoToPlaylist,
} from "@app/api/schema/Api";
import { CookiesKeys } from "@lib/constants";
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
        const addVideoToPlaylist = await prisma.partyPlaylist.create({
            data: {
                partyId,
                video,
            },
        });

        return NextResponse.json({
            message: "Thêm video vào danh sách phát thành công",
            video: addVideoToPlaylist.video,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Thêm video vào danh sách phát thất bại" },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}

export async function DELETE(request: NextRequest) {
    const token = request.cookies.get(CookiesKeys.accessToken)?.value;
    const requestBody: { id: number } = await request.json();

    if (!token) {
        return NextResponse.json(
            { message: "Không có token được gửi lên" },
            { status: HttpStatusCode.Unauthorized }
        );
    }

    try {
        const removeVideoFromPlaylist = await prisma.partyPlaylist.delete({
            where: {
                id: requestBody.id,
            },
        });

        return NextResponse.json({
            message: "Xóa video khỏi danh sách phát thành công",
            removeId: removeVideoFromPlaylist.id,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Xóa video khỏi danh sách phát thất bại",
            },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}
