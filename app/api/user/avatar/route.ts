import { CookiesKeys } from "@/lib/constants";
import jwt from "@/lib/jwt";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import cloudinary, { UploadApiResponse } from "cloudinary";
import { UploadAvatarSchema } from "@api/schema/Api";

export async function POST(request: NextRequest) {
    const token = request.cookies.get(CookiesKeys.accessToken)?.value;
    const formData = await request.formData();
    const avatarFile = formData.get("avatar") as File;
    const arrayBuffer = await avatarFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    cloudinary.v2.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });

    const validate = await UploadAvatarSchema.safeParseAsync({
        avatar: avatarFile,
    });

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
        await jwt.VerifyToken(token);

        const uploadResult = await new Promise((resolve) => {
            cloudinary.v2.uploader
                .upload_stream((_, uploadResult) => {
                    return resolve(uploadResult);
                })
                .end(buffer);
        });

        return NextResponse.json({
            message: "Upload avatar thành công",
            avatar: (uploadResult as UploadApiResponse).public_id,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Upload avatar thất bại" },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}
