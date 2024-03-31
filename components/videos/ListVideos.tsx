import React from "react";

export const ListVideos = ({ children }: { children: React.ReactNode }) => {
    return <div className={"flex flex-wrap"}>{children}</div>;
};
