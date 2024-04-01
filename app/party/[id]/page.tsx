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
            <YoutubePlayer
                videoId="yrPIlWfM75o"
                videoTitle="TOULIVER x BINZ x ANDREE RIGHT HAND - KRAZY ( Ft. EVY ) [ OFFICIAL MV ]"
            />
            <div className="flex flex-col xl:basis-1/3 basis-full space-y-3 space">
                <Menu />
                <InviteMenu />
            </div>
        </div>
    );
}
