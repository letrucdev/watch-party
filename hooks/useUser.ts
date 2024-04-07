import { privatePath } from "@constants/path";
import { userApi } from "@lib/apis";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export const useUser = () => {
    const pathname = usePathname();

    const isPrivatePath = privatePath.some((path) => pathname.startsWith(path));

    const { data, isPending } = useQuery({
        queryKey: ["user"],
        staleTime: Infinity,
        queryFn: userApi.Info,
        enabled: isPrivatePath,
    });

    const user = data?.user;

    return { user, isPending };
};
