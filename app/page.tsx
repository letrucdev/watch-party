import { ListVideos } from "@/components/videos/ListVideos";
import { VideoSkeleton } from "@/components/videos/VideoSkeleton";
import { Flame } from "lucide-react";
import dynamic from "next/dynamic";

const Video = dynamic(() => import("@/components/videos/Video"), {
    loading: () => <VideoSkeleton />,
});

export default function Home() {
    return (
        <>
            <span className="flex space-x-1">
                <h2 className="text-xl font-semibold mb-2">Đề xuất</h2>
                <Flame />
            </span>
            <ListVideos>
                {Array(50)
                    .fill(0)
                    .map((_, index) => (
                        <Video key={index} />
                    ))}
            </ListVideos>
        </>
    );
}
