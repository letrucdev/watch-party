import { CookiesKeys } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = cookies();
    cookieStore.delete(CookiesKeys.accessToken);

    return NextResponse.json({ message: "Đăng xuất tài khoản thành công" });
}
