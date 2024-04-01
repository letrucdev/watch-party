import { ListVideos } from "@/components/videos/ListVideos";
import { VideoSkeleton } from "@/components/videos/VideoSkeleton";
import dynamic from "next/dynamic";

const Video = dynamic(() => import("@/components/videos/Video"), {
    loading: () => <VideoSkeleton />,
});

export default function Home() {
    return (
        <ListVideos>
            {Array(50)
                .fill(0)
                .map((_, index) => (
                    <Video key={index} />
                ))}
        </ListVideos>
    );
}
