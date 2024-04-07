import { IPlaylistVideo } from "@type/api.type";
import Image from "next/image";

export default function PlayListItem({
    thumbnail,
    channelTitle,
    videoId,
    videoTitle,
}: IPlaylistVideo) {
    return (
        <div className="flex px-4 py-2 cursor-pointer hover:bg-primary-foreground">
            <div className="rounded-lg overflow-hidden flex-shrink-0 w-32 aspect-video mr-2">
                <Image
                    alt="thumbnail"
                    src={thumbnail}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col">
                <p className="line-clamp-2 font-semibold text-sm">
                    {videoTitle}
                </p>
                <small className="text-muted-foreground mt-1 line-clamp-1">
                    {channelTitle}
                </small>
            </div>
        </div>
    );
}
