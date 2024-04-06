"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { youtubeApi } from "@/lib/apis";
import { VideoSkeleton } from "./VideoSkeleton";
import Video from "./Video";

export const TrendingVideos = ({ className }: { className?: string }) => {
    const { data: videos, isPending } = useQuery({
        queryKey: ["youtubeVideos"],
        queryFn: youtubeApi.Videos,
        staleTime: Infinity,
    });

    return (
        <div className={cn("flex flex-wrap -mx-2", className)}>
            {isPending &&
                Array(12)
                    .fill(0)
                    .map((_, index) => {
                        return <VideoSkeleton key={index} />;
                    })}
            {videos &&
                videos.map((video) => {
                    return (
                        <Video
                            id={video.id}
                            key={video.id}
                            snippet={video.snippet}
                            statistics={video.statistics}
                        />
                    );
                })}
        </div>
    );
};
