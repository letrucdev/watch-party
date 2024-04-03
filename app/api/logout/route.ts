import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = cookies();
    cookieStore.delete("__watch_party_accessToken");

    return NextResponse.json({ message: "Đăng xuất tài khoản thành công" });
}
