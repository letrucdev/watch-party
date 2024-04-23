import {youtubeApi} from "@lib/apis";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "@/context/AuthContext";
import {AUTH_STATUS} from "@type/enum/auth.enum";

export const useTrendingVideos = () => {

    const {isAuthenticated} = useAuth()

    const {data, isPending} = useQuery({
        queryKey: ["youtubeVideos"],
        queryFn: youtubeApi.Videos,
        staleTime: Infinity,
        enabled: isAuthenticated === AUTH_STATUS.AUTHENTICATED,
    });

    const videos = data?.items

    return {videos, isPending};
};
