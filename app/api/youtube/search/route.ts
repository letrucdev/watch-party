import { YoutubeApiPath } from "@constants/youtubeApiPath";
import { CookiesKeys } from "@lib/constants";
import axios, { AxiosRequestConfig, HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import jwt from "@lib/jwt";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");

    let config: AxiosRequestConfig = {
        method: "get",
        url: YoutubeApiPath.Search,
        params: {
            key: process.env.YOUTUBE_API_KEY,
            part: "snippet",
            maxResults: 10,
            type: "video",
            q,
        },
    };

    const token = request.cookies.get(CookiesKeys.accessToken)?.value;

    if (!token) {
        return NextResponse.json(
            { message: "Không có token được gửi lên" },
            { status: HttpStatusCode.Unauthorized }
        );
    }

    try {
        await jwt.VerifyToken(token);
        const response = await axios.request(config);
        return NextResponse.json({
            totalResults: response.data.pageInfo.resultsPerPage,
            items: response.data.items,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            totalResults: 0,
            items: [],
        });
    }
}
