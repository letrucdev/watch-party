import { CookiesKeys } from "@/lib/constants";
import jwt from "@/lib/jwt";
import { IUser } from "@/types/user.type";
import { UpdateUserInfoSchema } from "@api/schema/User";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { IUpdateUserInfoRequest } from "@/types/api.type";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const token = request.cookies.get(CookiesKeys.accessToken)?.value;

    if (!token) {
        return NextResponse.json(
            { message: "Không có token được gửi lên" },
            { status: HttpStatusCode.Unauthorized }
        );
    }

    try {
        const payload = await jwt.VerifyToken(token);
        const user = await prisma.user.findUnique({
            select: {
                id: true,
                email: true,
                displayName: true,
                avatar: true,
                setting: {
                    select: {
                        animationEnable: true,
                        ecoMode: true,
                    },
                },
            },
            where: { id: payload?.userId as number },
        });
        return NextResponse.json({
            message: "Lấy thông tin người dùng thành công",
            user,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Lỗi" },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}

export async function PUT(request: NextRequest) {
    const token = request.cookies.get(CookiesKeys.accessToken)?.value;
    const requestBody: IUpdateUserInfoRequest = await request.json();
    const { displayName, email, avatar } = requestBody;

    if (!token) {
        return NextResponse.json(
            { message: "Không có token được gửi lên" },
            { status: HttpStatusCode.Unauthorized }
        );
    }

    const validate = await UpdateUserInfoSchema.safeParseAsync(requestBody);

    if (!validate.success) {
        const formattedError = validate.error.flatten().fieldErrors;
        return Response.json(formattedError, {
            status: HttpStatusCode.BadRequest,
        });
    }

    try {
        const payload = await jwt.VerifyToken(token);
        const updateUser = await prisma.user.update({
            where: {
                id: payload?.userId as number,
            },
            data: {
                email,
                displayName,
                avatar: avatar,
            },
            select: {
                id: true,
                displayName: true,
                email: true,
                avatar: true,
                setting: {
                    select: {
                        ecoMode: true,
                        animationEnable: true,
                    },
                },
            },
        });

        return NextResponse.json({
            message: "Cập nhật thông tin thành công",
            user: updateUser,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Cập nhật thông tin thất bại",
            },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}
