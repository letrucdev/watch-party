import Image from "next/image";

export const Video = () => {
    return (
        <div className={"flex xl:basis-1/4 md:basis-1/3 sm:basis-1/2 p-2"}>
            <div className="flex flex-col cursor-pointer group">
                <div className={"w-full overflow-hidden rounded "}>
                    <Image
                        src="https://i.ytimg.com/vi/P2R0_J8-ls8/maxresdefault.jpg"
                        alt="thumbnail"
                        width={1280}
                        height={720}
                        className={
                            "group-hover:scale-110 transition-all duration-200"
                        }
                    />
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
            </div>
        </div>
    );
};
