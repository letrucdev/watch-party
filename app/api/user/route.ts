import { CookiesKeys } from "@/lib/constants";
import { UpdateUserInfoSchema } from "@api/schema/User";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { IUpdateUserInfoRequest } from "@/types/api.type";
import jwt from "@/lib/jwt";

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
                changedEmail: true,
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

        const user = await prisma.user.findUnique({
            select: {
                email: true,
                changedEmail: true,
            },
            where: {
                id: payload?.userId as number,
            },
        });

        const isChangedEmail = user?.changedEmail;

        const updateUser = await prisma.user.update({
            where: {
                id: payload?.userId as number,
            },
            data:
                isChangedEmail || email === user?.email
                    ? {
                          displayName,
                          avatar,
                      }
                    : {
                          email,
                          displayName,
                          avatar,
                          changedEmail: true,
                      },
            select: {
                id: true,
                displayName: true,
                email: true,
                avatar: true,
                changedEmail: true,
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
