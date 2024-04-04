import { CookiesKeys } from "@/lib/constants";
import jwt from "@/lib/jwt";
import { IUserSetting } from "@/types/user.type";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
    const token = request.cookies.get(CookiesKeys.accessToken)?.value;
    const requestBody: IUserSetting = await request.json();

    const { animationEnable, ecoMode } = requestBody;
    if (!token) {
        return NextResponse.json(
            { message: "Không có token được gửi lên" },
            { status: HttpStatusCode.Unauthorized }
        );
    }

    try {
        const payload = await jwt.VerifyToken(token);
        const changeSystemSetting = await prisma.userSetting.update({
            where: { userId: payload?.userId as number },
            select: { animationEnable: true, ecoMode: true },
            data: {
                animationEnable,
                ecoMode,
            },
        });

        return NextResponse.json({
            message: "Cập nhật cài đặt hệ thống thành công",
            setting: changeSystemSetting,
        });
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}
