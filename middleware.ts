import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authPath, routePath } from "./constants/path";
import jwt from "./lib/jwt";

const isAuthenticated = async (accessToken: string) => {
    try {
        return (await jwt.VerifyToken(accessToken)).payload;
    } catch (error) {}
};

export async function middleware(request: NextRequest) {
    const accessTokenFromCookies = request.cookies.get(
        "__watch_party_accessToken"
    )?.value;

    if (
        !accessTokenFromCookies ||
        !(await isAuthenticated(accessTokenFromCookies))
    ) {
        const response = NextResponse.redirect(
            new URL(routePath.login, request.url)
        );
        response.cookies.delete("__watch_party_accessToken");
        return response;
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher:
        "/((?!login|register|api/login|api/register|_next/static|_next/image|favicon.ico|assets).*)",
};
