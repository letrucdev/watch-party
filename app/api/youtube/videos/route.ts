import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosRequestConfig, HttpStatusCode } from "axios";
import { CookiesKeys } from "@/lib/constants";
import jwt from "@/lib/jwt";
import { YoutubeApiPath } from "@/constants/youtubeApiPath";

export async function GET(request: NextRequest) {
    let config: AxiosRequestConfig = {
        method: "get",
        url: YoutubeApiPath.GetVideos,
        params: {
            key: process.env.YOUTUBE_API_KEY,
            part: "contentDetails,snippet,statistics",
            chart: "mostPopular",
            regionCode: "VN",
            maxResults: 30,
            videoCategoryId: 10,
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
        return NextResponse.json(response.data.items);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error });
    }
}
