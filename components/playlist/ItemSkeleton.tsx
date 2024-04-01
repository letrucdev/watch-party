import { Skeleton } from "@/components/ui/skeleton";

export const ItemSkeleton = () => {
    return (
        <div className="flex px-4 py-2 cursor-pointer hover:bg-primary-foreground">
            <div className="rounded-lg overflow-hidden flex-shrink-0 w-32 aspect-video mr-2">
                <Skeleton className="rounded-lg w-full h-full" />
            </div>
            <div className="flex flex-col flex-grow justify-center space-y-1">
                <Skeleton className="rounded w-3/4 h-4" />
                <Skeleton className="rounded w-2/4 h-4" />
                <Skeleton className="rounded w-1/3 h-4" />
            </div>
        </div>
    );
};
