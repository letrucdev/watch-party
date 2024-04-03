import { NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { ILogin, LoginSchema } from "../schema/Auth";
import { cookies } from "next/headers";
import jwt from "@/lib/jwt";
import bcrypt from "bcrypt";
import _ from "lodash";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const requestBody: ILogin = await request.json();
    const { email, password } = requestBody;

    const validate = await LoginSchema.safeParseAsync(requestBody);

    if (!validate.success) {
        const formattedError = validate.error.flatten().fieldErrors;
        return Response.json(formattedError, {
            status: 400,
        });
    }

    try {
        /* Find user */
        const user = await prisma.user.findUniqueOrThrow({
            where: { email },
            select: {
                id: true,
                avatar: true,
                displayName: true,
                password: true,
                email: true,
                setting: { select: { ecoMode: true, animationEnable: true } },
            },
        });

        /* Compare password */
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return Response.json(
                {
                    password: ["Mật khẩu không chính xác"],
                },
                { status: 401 }
            );
        }

        /* Generate access token */

        const accessToken = await jwt.SignToken({
            userId: user.id,
            email: user.email,
        });

        /* Set Cookies */
        cookies().set({
            name: "__watch_party_accessToken",
            value: accessToken || "",
            httpOnly: true,
            path: "/",
        });

        /* Email and password is match => Login Success */
        return Response.json({
            message: "Đăng nhập thành công",
            user: {
                id: user.id,
                email: user.email,
                avatar: user.avatar,
                displayName: user.displayName,
                setting: user.setting,
            },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            /* 
            Email is not exits,
            P2025 code mean no matches were found 
            */
            if (error.code === "P2025") {
                return Response.json(
                    {
                        email: ["Email không tồn tại"],
                    },
                    { status: 401 }
                );
            }
        }
    }
}
