"use client";
import { cn } from "@/lib/utils";
import { VideoSearchItem } from "./VideoSearchItem";
import { VideoSearchItemSkeleton } from "./VideoSearchItemSkeleton";
import { useQuery } from "@tanstack/react-query";
import { youtubeApi } from "@lib/apis";
import { formatNumberSocialStyle } from "@utils/index";

interface ISearchVideos {
    className?: string;
    query: string;
}

export const SearchVideos = ({ className, query }: ISearchVideos) => {
    const { data, isPending } = useQuery({
        queryKey: ["search", query],
        queryFn: () => youtubeApi.Search(query),
        staleTime: 60 * 1000 * 180,
    });

    return (
        <>
            <div className="flex flex-col mb-3">
                <h2 className="text-xl font-semibold">Kết quả tìm kiếm</h2>
                <p className="text-muted-foreground">
                    {formatNumberSocialStyle(data?.totalResults || 0)} kết quả
                </p>
            </div>
            <div className={cn("flex flex-col -mx-2", className)}>
                {isPending &&
                    Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <VideoSearchItemSkeleton key={index} />
                        ))}
                {data &&
                    data.items.map((video) => {
                        return (
                            <VideoSearchItem
                                key={video.id.videoId}
                                snippet={video.snippet}
                                statistics={video.statistics}
                                id={video.id.videoId}
                            />
                        );
                    })}
            </div>
        </>
    );
};
