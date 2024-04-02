import { routePath } from "@/constants/path";
import { cn } from "@/lib/utils";
import { ListPlus, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IVideo {
    className?: string;
}

export default function Video({ className }: IVideo) {
    return (
        <div
            className={cn(
                "flex xl:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-full p-2",
                className
            )}
        >
            <Link
                href={routePath.party + `/${crypto.randomUUID()}`}
                className="flex flex-col cursor-pointer group"
            >
                <div className={"overflow-hidden rounded-lg relative"}>
                    <Image
                        quality={80}
                        src="https://i.ytimg.com/vi/P2R0_J8-ls8/maxresdefault.jpg"
                        alt="thumbnail"
                        width={1280}
                        height={720}
                        className={
                            "group-hover:scale-110 transition-all duration-200"
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
                    NHẠC NGHE TRÊN GIƯỜNG #6🎧NHẠC TRẺ REMIX 2024🎧MIXSET HOUSE
                    LAK & DEEP HOUSE 2024🎧VIET DEEP 2024
                </p>
                <p className={"text-sm text-muted-foreground font-medium mt-1"}>
                    Xiang Remix
                </p>
                <span
                    className={
                        "flex items-center text-muted-foreground text-sm"
                    }
                >
                    <p>4.2M lượt xem</p>
                    <span
                        className={"w-1 h-1 bg-muted-foreground rounded mx-2"}
                    ></span>
                    <p>4 giờ trước</p>
                </span>
            </Link>
        </div>
    );
}
