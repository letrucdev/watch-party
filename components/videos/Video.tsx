"use client";
import { routePath } from "@/constants/path";
import { cn } from "@/lib/utils";
import { IYoutubeVideoItem } from "@/types/api.type";
import { ListPlus, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fromNow } from "@/utils/time";
import { formatNumberSocialStyle } from "@/utils";

interface IVideo extends IYoutubeVideoItem {
    className?: string;
}

export default function Video({ className, id, snippet, statistics }: IVideo) {
    return (
        <div
            className={cn(
                "flex xl:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-full p-2",
                className
            )}
        >
            <Link
                href={routePath.party + `/${id}`}
                className="flex flex-col cursor-pointer group"
            >
                <div className={"overflow-hidden rounded-lg relative"}>
                    <Image
                        priority
                        quality={80}
                        src={
                            snippet.thumbnails.maxres?.url ||
                            snippet.thumbnails.standard?.url ||
                            snippet.thumbnails.high.url ||
                            snippet.thumbnails.medium.url ||
                            snippet.thumbnails.default.url
                        }
                        alt="thumbnail"
                        width={640}
                        height={480}
                        className={
                            "group-hover:scale-110 transition-all duration-200 aspect-video object-cover"
                        }
                    />
                    <div className="bg-primary-foreground/10 w-full h-full absolute z-10 top-0 rounded-lg backdrop-blur-sm flex flex-col xl:flex-row items-center justify-center space-x-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none ">
                        <Play size={36} />
                        <p className="font-semibold">Xem ngay</p>
                        {/* <ListPlus size={36} />
                        <p className="font-semibold">Thêm vào danh sách phát</p> */}
                    </div>
                </div>
                <p className={"line-clamp-2 text-sm font-semibold mt-2"}>
                    {snippet.title}
                </p>
                <p className={"text-sm text-muted-foreground font-medium mt-1"}>
                    {snippet.channelTitle}
                </p>
                <span
                    className={
                        "flex items-center text-muted-foreground text-sm"
                    }
                >
                    <p>
                        {`${formatNumberSocialStyle(
                            statistics?.viewCount || 0
                        )} lượt xem`}
                    </p>
                    <span
                        className={"w-1 h-1 bg-muted-foreground rounded mx-2"}
                    ></span>
                    <p>{fromNow(snippet.publishedAt)}</p>
                </span>
            </Link>
        </div>
    );
}
