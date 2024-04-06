/* import { ListVideos } from "@components/videos/TrendingVideos"; */
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("@components/menu/Menu"));
const InviteMenu = dynamic(() => import("@components/menu/InviteMenu"));
const YoutubePlayer = dynamic(() => import("@components/videos/YoutubePlayer"));

export default function RoomPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col xl:flex-row xl:space-y-0 xl:space-x-4 space-y-4">
            <div className="flex flex-col basis-2/3">
                <YoutubePlayer videoId={params.id} />
                {/*   <SuggestionVideos /> */}
            </div>

            <div className="flex flex-col xl:basis-1/3 basis-full space-y-3">
                <Menu />
                <InviteMenu />
            </div>
        </div>
    );
}
