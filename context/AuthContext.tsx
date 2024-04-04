"use client";
import { authApi, userApi } from "@/lib/apis";
import { LocalStorageKeys } from "@/lib/constants";
import {
    ClearUserFromLocalStorage,
    GetUserFromLocalStorage,
    SaveUserToLocalStorage,
} from "@/lib/utils";
import { IUser } from "@/types/user.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

interface IAuthContext {
    isAuthenticated: boolean;
    authUser: IUser | null;
    setAuthUser: (authUser: IUser) => void;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
    authUser: null,
    isAuthenticated: false,
    setAuthUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({
    children,
    cookies,
}: {
    children: React.ReactNode;
    cookies?: string;
}) => {
    const [authUser, setAuthUser] = useState<IUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logoutMutation = useMutation({
        mutationFn: authApi.Logout,
    });

    const getUserInfoQuery = useQuery({
        queryKey: ["user"],
        staleTime: Infinity,
        queryFn: userApi.Info,
        enabled: Boolean(cookies),
    });

    const logout = useCallback(() => logoutMutation.mutate(), [logoutMutation]); //handle logout

    useEffect(() => {
        if (!cookies) {
            setAuthUser(null);
            ClearUserFromLocalStorage();
            return;
        }
        setIsAuthenticated(true);
    }, [cookies]);

    useEffect(() => {
        if (getUserInfoQuery.data) {
            const user = getUserInfoQuery.data.user;
            setAuthUser(user);
        }
    }, [getUserInfoQuery]);

    return (
        <AuthContext.Provider
            value={{ authUser, setAuthUser, logout, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth: () => IAuthContext = () => useContext(AuthContext);

export { useAuth };
