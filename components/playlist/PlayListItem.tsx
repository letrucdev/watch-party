import { IVideo } from "@/types/video.type";
import Image from "next/image";

export default function PlayListItem({
    thumbnail,
    uploader,
    videoTitle,
}: IVideo) {
    return (
        <div className="flex px-4 py-2 cursor-pointer hover:bg-primary-foreground">
            <div className="rounded-lg overflow-hidden flex-shrink-0 w-32 aspect-video mr-2">
                <Image
                    alt="thumbnail"
                    src={thumbnail}
                    width={1280}
                    height={720}
                />
            </div>
            <div className="flex flex-col">
                <p className="line-clamp-2 font-semibold text-sm">
                    {videoTitle}
                </p>
                <small className="text-muted-foreground mt-1 line-clamp-1">
                    {uploader}
                </small>
            </div>
        </div>
    );
}
