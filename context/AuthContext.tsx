"use client";
import { authApi } from "@/lib/apis";
import { GetUserFromLocalStorage } from "@/lib/utils";
import { IUser } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

interface IAuthContext {
    authUser: IUser | null;
    setAuthUser: (authUser: IUser) => void;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
    authUser: null,
    setAuthUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<IUser>(GetUserFromLocalStorage());

    const logoutMutation = useMutation({
        mutationFn: authApi.Logout,
    });

    const logout = () => logoutMutation.mutate(); //handle logout

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth: () => IAuthContext = () => useContext(AuthContext);

export { useAuth };
