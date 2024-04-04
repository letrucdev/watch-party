import { CookiesKeys } from "@/lib/constants";
import { IChangeUserPassword } from "@api/schema/User";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import jwt from "@/lib/jwt";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
    const token = request.cookies.get(CookiesKeys.accessToken)?.value;
    const requestBody: IChangeUserPassword = await request.json();
    const { newPassword, oldPassword } = requestBody;
    if (!token) {
        return NextResponse.json(
            { message: "Không có token được gửi lên" },
            { status: HttpStatusCode.Unauthorized }
        );
    }
    try {
        const payload = await jwt.VerifyToken(token);

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: payload?.userId as number,
            },
        });

        const comparePassword = bcrypt.compareSync(oldPassword, user.password);
        if (!comparePassword) {
            return Response.json(
                {
                    oldPassword: ["Mật khẩu cũ không chính xác"],
                },
                { status: HttpStatusCode.Unauthorized }
            );
        }

        await prisma.user.update({
            where: { id: payload?.userId as number },
            data: { password: bcrypt.hashSync(newPassword, 10) },
        });

        return NextResponse.json({ message: "Đổi mật khẩu thành công" });
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}
