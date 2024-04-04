import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authPath, privatePath, routePath } from "./constants/path";
import jwt from "./lib/jwt";
import { CookiesKeys } from "./lib/constants";

const isAuthenticated = (accessToken: string) => {
    try {
        return jwt.VerifyToken(accessToken);
    } catch (error) {
        throw error;
    }
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessTokenFromCookies = request.cookies.get(
        CookiesKeys.accessToken
    )?.value;

    const isAuth = await isAuthenticated(accessTokenFromCookies!);

    if (privatePath.some((path) => path.startsWith(pathname)) && !isAuth) {
        const response = NextResponse.redirect(
            new URL(routePath.login, request.url)
        );
        response.cookies.delete(CookiesKeys.accessToken);
        return response;
    }

    if (authPath.includes(pathname) && isAuth) {
        return NextResponse.redirect(new URL(routePath.home, request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
};
