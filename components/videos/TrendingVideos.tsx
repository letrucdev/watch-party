"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { VideoSkeleton } from "./VideoSkeleton";
import Video from "./Video";
import { useTrendingVideos } from "@/hooks/useTrendingVideos";

export const TrendingVideos = ({ className }: { className?: string }) => {
    const { videos, isPending } = useTrendingVideos();

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
