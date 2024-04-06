import { routePath } from "@/constants/path";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { IYoutubeVideoItem } from "@/types/api.type";
import { Play } from "lucide-react";
import { formatNumberSocialStyle } from "@/utils";
import { fromNow } from "@/utils/time";

interface ISearchVideo extends IYoutubeVideoItem {
    className?: string;
}

export const VideoSearchItem = ({
    className,
    snippet,
    id,
    statistics,
}: ISearchVideo) => {
    return (
        <div className={cn("flex basis-full p-2", className)}>
            <Link
                href={routePath.party + `/${id}`}
                className="flex flex-col md:flex-row md:space-y-0 md:space-x-4 space-y-2 cursor-pointer group  flex-grow"
            >
                <div
                    className={
                        "overflow-hidden rounded-lg relative shrink-0 aspect-video md:w-[480px] w-full"
                    }
                >
                    <Image
                        priority
                        src={
                            snippet.thumbnails.high.url ||
                            snippet.thumbnails.standard?.url ||
                            snippet.thumbnails.maxres?.url ||
                            snippet.thumbnails.medium.url ||
                            snippet.thumbnails.default.url
                        }
                        alt="thumbnail"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className={
                            "group-hover:scale-110 transition-all duration-300 w-full h-auto object-cover aspect-video"
                        }
                    />
                    <div className="bg-zinc-900/60 w-full h-full absolute z-10 top-0 rounded-lg backdrop-blur-sm flex flex-col xl:flex-row items-center justify-center space-x-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none text-white">
                        <Play size={36} />
                        <p className="font-semibold">Xem ngay</p>
                        {/* <ListPlus size={36} />
                        <p className="font-semibold">Thêm vào danh sách phát</p> */}
                    </div>
                </div>

                <div className="flex flex-col">
                    <p className={"line-clamp-3 text-xl font-semibold"}>
                        {snippet.title}
                    </p>
                    <p
                        className={
                            "text-sm text-muted-foreground font-medium mt-1"
                        }
                    >
                        {snippet.channelTitle}
                    </p>
                    <span
                        className={
                            "flex items-center text-muted-foreground text-sm"
                        }
                    >
                        {/*  <p>
                            {`${formatNumberSocialStyle(
                                statistics?.viewCount || 0
                            )} lượt xem`}
                        </p>
                        <span
                            className={
                                "w-1 h-1 bg-muted-foreground rounded mx-2"
                            }
                        ></span> */}
                        <p>{fromNow(snippet.publishedAt)}</p>
                    </span>
                    <p
                        className={
                            "text-sm text-muted-foreground font-medium mt-2 line-clamp-2"
                        }
                    >
                        {snippet.description}
                    </p>
                </div>
            </Link>
        </div>
    );
};
