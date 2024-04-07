"use client";
import { useRoomContext } from "@/context/RoomContext";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Menu = dynamic(() => import("@components/menu/Menu"));
const InviteMenu = dynamic(() => import("@components/menu/InviteMenu"));
const YoutubePlayer = dynamic(() => import("@components/videos/YoutubePlayer"));

export default function RoomPage({ params }: { params: { id: string } }) {
    const { playlist, setPartyId } = useRoomContext();

    useEffect(() => {
        setPartyId(params.id);
    }, [params.id, setPartyId]);

    if (!playlist) return null;

    return (
        <div className="flex flex-col xl:flex-row xl:space-y-0 xl:space-x-4 space-y-4">
            <div className="flex flex-col basis-2/3">
                <YoutubePlayer
                    videoId={playlist[0].video.videoId}
                    videoTitle={playlist[0].video.videoTitle}
                />
                {/*   <SuggestionVideos /> */}
            </div>

            <div className="flex flex-col xl:basis-1/3 basis-full space-y-3">
                <Menu />
                <InviteMenu />
            </div>
        </div>
    );
}
