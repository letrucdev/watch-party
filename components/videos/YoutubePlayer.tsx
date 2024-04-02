"use client";

import YouTube from "react-youtube";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowDownToLine } from "lucide-react";
import { Button } from "../ui/button";

interface IYoutubePlayer {
    videoId: string;
    videoTitle: string;
}

export default function YoutubePlayer({ videoTitle, videoId }: IYoutubePlayer) {
    const opts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div className="flex flex-col">
            <YouTube
                className="w-full aspect-video mb-4"
                iframeClassName="w-full h-full rounded-xl"
                videoId={videoId}
                opts={opts} // defaults -> ''
            />
            <h2 className="font-semibold line-clamp-2 text-xl">{videoTitle}</h2>

            <div className="flex mt-4 space-x-4 w-full">
                <div className="flex mr-auto">
                    <Avatar className="mr-2">
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarFallback>YT</AvatarFallback>
                    </Avatar>
                    <span className="flex flex-col justify-center">
                        <p className="text-sm line-clamp-1 font-semibold">
                            Tên kênh
                        </p>
                        <small className="text-muted-foreground line-clamp-1">
                            10K người đăng ký
                        </small>
                    </span>
                </div>
                <Button
                    className="select-none"
                    variant={"outline"}
                    disabled
                >
                    <ArrowDownToLine
                        size={16}
                        className="mr-2"
                    />
                    Tải video
                </Button>
            </div>
        </div>
    );
}
