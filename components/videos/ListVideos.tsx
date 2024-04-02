import React from "react";
import { cn } from "@/lib/utils";

export const ListVideos = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-wrap -mx-2", className)}>{children}</div>
    );
};
