"use client";

import YouTube from "react-youtube";

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
        <div className="flex flex-col flex-grow">
            <YouTube
                className="w-full aspect-video mb-2"
                iframeClassName="w-full h-full rounded-xl"
                videoId={videoId}
                opts={opts} // defaults -> ''
            />
            <h2 className="font-semibold line-clamp-2 text-xl">{videoTitle}</h2>
        </div>
    );
}
