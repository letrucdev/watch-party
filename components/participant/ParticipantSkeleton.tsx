import { Skeleton } from "../ui/skeleton";

export const ParticipantSkeleton = () => {
    return (
        <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
            <Skeleton className="w-10 h-10 rounded-full shrink-0 overflow-hidden mr-2" />
            <span className="flex flex-col flex-grow space-y-1">
                <Skeleton className="w-1/3 h-3 rounded" />
                <Skeleton className="w-1/5 h-3 rounded" />

                {/*  <p className="text-sm line-clamp-1 text-ellipsis font-semibold">
                    {username}
                </p>
                <small className="text-muted-foreground line-clamp-1">
                    Chủ phòng
                </small> */}
            </span>
        </div>
    );
};
