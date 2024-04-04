import { NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { ILogin, LoginSchema } from "../schema/Auth";
import { cookies } from "next/headers";
import jwt from "@/lib/jwt";
import bcrypt from "bcrypt";
import _ from "lodash";
import { HttpStatusCode } from "axios";
import { CookiesKeys } from "@/lib/constants";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const requestBody: ILogin = await request.json();
    const { email, password } = requestBody;

    const validate = await LoginSchema.safeParseAsync(requestBody);

    if (!validate.success) {
        const formattedError = validate.error.flatten().fieldErrors;
        return Response.json(formattedError, {
            status: HttpStatusCode.BadRequest,
        });
    }

    try {
        /* Find user */
        const user = await prisma.user.findUniqueOrThrow({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                displayName: true,
                avatar: true,
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
                { status: HttpStatusCode.Unauthorized }
            );
        }

        /* Generate access token */
        const accessToken = await jwt.SignToken({
            userId: user.id,
            email: user.email,
        });

        /* Set Cookies */
        const currentTime = new Date().getTime();
        const expiryTime = currentTime + 7 * 24 * 60 * 60 * 1000;
        const cookiesMaxAge = Math.floor((expiryTime - currentTime) / 1000);

        cookies().set({
            name: CookiesKeys.accessToken,
            value: accessToken || "",
            maxAge: cookiesMaxAge,
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
                    { status: HttpStatusCode.Unauthorized }
                );
            }
        }
        throw error;
    }
}
