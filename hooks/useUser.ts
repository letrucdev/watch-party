import {userApi} from "@lib/apis";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "@/context/AuthContext";
import {AUTH_STATUS} from "@type/enum/auth.enum";

export const useUser = () => {
    const {isAuthenticated} = useAuth();

    const {data} = useQuery({
        queryKey: ["user"],
        staleTime: Infinity,
        queryFn: userApi.me,
        enabled: isAuthenticated === AUTH_STATUS.AUTHENTICATED,
    });

    const user = data;

    return {user};
};
