import { Skeleton } from "@components/ui/skeleton";

export const VideoSearchItemSkeleton = () => {
    return (
        <div className="flex basis-full p-2">
            <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-4 space-y-2 cursor-pointer group flex-grow">
                <div
                    className={
                        "overflow-hidden rounded-lg relative shrink-0 aspect-video md:w-[480px] w-full"
                    }
                >
                    <Skeleton className="w-full h-auto object-cover aspect-video" />
                </div>

                <div className="flex flex-col w-full space-y-2">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-2/4 h-4" />
                    <Skeleton className="w-1/3 h-4" />
                    <Skeleton className="w-2/3 h-4" />
                </div>
            </div>
        </div>
    );
};
