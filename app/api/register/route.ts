import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { IRegister, RegisterSchema } from "../schema/Auth";
import bcrypt from "bcrypt";
import { HttpStatusCode } from "axios";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const requestBody: IRegister = await request.json();
    const { email, displayName, password } = requestBody;

    /* Validate fields */
    const validate = await RegisterSchema.safeParseAsync(requestBody);

    if (!validate.success) {
        const formattedError = validate.error.flatten().fieldErrors;
        return Response.json(formattedError);
    }

    /* Create User */
    let newUser: Prisma.UserCreateInput;

    try {
        const hashPassword = bcrypt.hashSync(password, 10);

        newUser = {
            email,
            displayName,
            password: hashPassword,
            setting: {
                create: {
                    animationEnable: true,
                    ecoMode: false,
                },
            },
        };

        await prisma.user.create({
            data: newUser,
        });

        return Response.json(
            {
                message: "Tạo tài khoản thành công!",
            },
            { status: HttpStatusCode.Created }
        );
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            /* 
            Email is exits,
            P2025 code mean no matches were found 
            */
            if (error.code === "P2002") {
                return Response.json(
                    {
                        email: ["Email đã được sử dụng"],
                    },
                    { status: HttpStatusCode.BadRequest }
                );
            }
        }
        throw error;
    }
}
