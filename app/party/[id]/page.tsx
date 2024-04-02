import { SuggestionVideos } from "@/components/room/SuggestionVideos";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ListVideos } from "@/components/videos/ListVideos";
import Video from "@/components/videos/Video";
import { ArrowDownToLine } from "lucide-react";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("@/components/menu/Menu"));
const InviteMenu = dynamic(() => import("@/components/menu/InviteMenu"), {
    ssr: false,
});

const YoutubePlayer = dynamic(
    () => import("@/components/videos/YoutubePlayer")
);

export default function RoomPage() {
    return (
        <div className="flex flex-col xl:flex-row xl:space-y-0 xl:space-x-4 space-y-4">
            <div className="flex flex-col basis-2/3">
                <YoutubePlayer
                    videoId="h4U1C1ESwDk"
                    videoTitle="TIÊU ĐỀ VIDEO"
                />
                <SuggestionVideos />
            </div>

            <div className="flex flex-col xl:basis-1/3 basis-full space-y-3">
                <Menu />
                <InviteMenu />
            </div>
        </div>
    );
}
