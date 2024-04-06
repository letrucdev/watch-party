"use client";

import { youtubeApi } from "@lib/apis";
import { formatNumberSocialStyle } from "@/utils";
import { SearchVideos } from "@components/videos/SearchVideos";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const { data, isPending } = useQuery({
        queryKey: ["search", query],
        queryFn: () => youtubeApi.Search(query || ""),
        staleTime: 60 * 1000 * 180,
    });

    return (
        <>
            <div className="flex flex-col mb-3">
                <h2 className="text-xl font-semibold">Kết quả tìm kiếm</h2>
                <p className="text-muted-foreground">
                    {formatNumberSocialStyle(data?.totalResults || 0)} kết quả
                </p>
            </div>
            <SearchVideos
                searchResults={data}
                isPending={isPending}
            />
        </>
    );
}
