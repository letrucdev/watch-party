import { cn } from "@/lib/utils";
import { ISearchVideoResult, YoutubeSearchItemKind } from "@/types/api.type";
import { VideoSearchItem } from "./VideoSearchItem";
import { VideoSearchItemSkeleton } from "./VideoSearchItemSkeleton";

interface ISearchVideos {
    className?: string;
    searchResults?: ISearchVideoResult;
    isPending: boolean;
}

export const SearchVideos = ({
    className,
    searchResults,
    isPending,
}: ISearchVideos) => {
    return (
        <div className={cn("flex flex-col -mx-2", className)}>
            {isPending &&
                Array(5)
                    .fill(0)
                    .map((_, index) => <VideoSearchItemSkeleton key={index} />)}
            {searchResults &&
                searchResults.items.map((video) => {
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
    );
};
