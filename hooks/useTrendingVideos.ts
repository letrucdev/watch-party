import { youtubeApi } from "@lib/apis";
import { useQuery } from "@tanstack/react-query";

export const useTrendingVideos = () => {
    const { data: videos, isPending } = useQuery({
        queryKey: ["youtubeVideos"],
        queryFn: youtubeApi.Videos,
        staleTime: Infinity,
    });

    return { videos, isPending };
};
