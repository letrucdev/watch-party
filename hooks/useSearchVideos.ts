import { youtubeApi } from "@lib/apis";
import { useQuery } from "@tanstack/react-query";

export const useSearchVideos = (query: string) => {
    const { data, isPending } = useQuery({
        queryKey: ["search", query],
        queryFn: () => youtubeApi.Search(query),
        staleTime: 60 * 1000 * 180,
    });

    const videos = data?.items;
    const totalResults = data?.totalResults;

    return { videos, totalResults, isPending };
};
