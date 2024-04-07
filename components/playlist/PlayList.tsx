"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";
import { ItemSkeleton } from "./ItemSkeleton";
import { useRoomContext } from "@/context/RoomContext";

const PlayListItem = dynamic(() => import("./PlayListItem"), {
    loading: () => <ItemSkeleton />,
});

export default function PlayList() {
    const { playlist } = useRoomContext();

    return (
        <ScrollArea className="flex flex-col flex-grow">
            {playlist?.map(({ video }) => {
                return (
                    <PlayListItem
                        key={video.videoId}
                        videoId={video.videoId}
                        thumbnail={video.thumbnail}
                        channelTitle={video.channelTitle}
                        videoTitle={video.videoTitle}
                    />
                );
            })}
        </ScrollArea>
    );
}
