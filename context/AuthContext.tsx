"use client"

import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {getAccessTokenFromLS} from "@lib/utils";
import {usePathname, useRouter} from "next/navigation";
import {logout} from "@lib/auth";
import {AUTH_STATUS} from "@type/enum/auth.enum";
import {privatePath, routePath} from "@constants/path";

interface AuthContextProps {
    isAuthenticated: AUTH_STATUS;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: AUTH_STATUS.AUTHENTICATING,
    logout: logout
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState<AUTH_STATUS>(AUTH_STATUS.AUTHENTICATING);

    const handleLogout = () => {
        logout()
    }

    const isPrivatePath = useMemo(() => {
        return privatePath.some((path) => pathname.startsWith(path))
    }, [pathname])

    const handleInitAuthenticate = useCallback(() => {
        const accessToken = getAccessTokenFromLS()

        // NO access token or expires
        // -> unauthenticated
        if (!accessToken) {
            setIsAuthenticated(AUTH_STATUS.UNAUTHENTICATED)
            return router.push(routePath.login)
        }

        //  Has access token, and it still valid
        // -> authenticated
        if (!!accessToken) {
            return setIsAuthenticated(AUTH_STATUS.AUTHENTICATED)
        }
    }, [router])


    useEffect(() => {
        if (isPrivatePath && isAuthenticated !== AUTH_STATUS.AUTHENTICATED) handleInitAuthenticate()
    }, [handleInitAuthenticate, isAuthenticated, isPrivatePath])

    useEffect(() => {
        if (!isPrivatePath && isAuthenticated === AUTH_STATUS.AUTHENTICATED) router.push(routePath.home)
    }, [isAuthenticated, isPrivatePath, router])


    return <AuthContext.Provider value={{isAuthenticated, logout: handleLogout}}>
        {!isPrivatePath || isAuthenticated === AUTH_STATUS.AUTHENTICATED ? children : null}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside the RoomProvider");
    }
    return context;
};
