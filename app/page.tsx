import { ListVideos } from "@/components/videos/ListVideos";
import { VideoSkeleton } from "@/components/videos/VideoSkeleton";
import dynamic from "next/dynamic";

const Video = dynamic(() => import("@/components/videos/Video"), {
    loading: () => <VideoSkeleton />,
});

export default function Home() {
    return (
        <>
            <div className="flex flex-col mb-3">
                <h2 className="text-xl font-semibold">Đề xuất</h2>
                <p className="text-muted-foreground">
                    Những video nổi bật hôm nay
                </p>
            </div>
            <ListVideos>
                {Array(36)
                    .fill(0)
                    .map((_, index) => (
                        <Video key={index} />
                    ))}
            </ListVideos>
        </>
    );
}
