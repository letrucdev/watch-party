import { ListVideos } from "@/components/videos/ListVideos";
import { Video } from "@/components/videos/Video";

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
