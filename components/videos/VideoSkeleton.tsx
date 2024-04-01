import { Skeleton } from "@/components/ui/skeleton";

export const VideoSkeleton = () => {
    return (
        <div className={"flex xl:basis-1/4 md:basis-1/3 sm:basis-1/2 p-2"}>
            <div className="flex flex-col w-full">
                <div className={"w-full overflow-hidden rounded"}>
                    <Skeleton className="rounded w-full aspect-video" />
                </div>
                <Skeleton className="w-2/3 h-4 rounded mt-2" />
                <Skeleton className="w-1/3 h-4 rounded mt-1" />
                <Skeleton className="w-3/4 h-4 rounded mt-2" />
            </div>
        </div>
    );
};
