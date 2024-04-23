import {type ClassValue, clsx} from "clsx";
import {IUser} from "@/types/user.type";
import {twMerge} from "tailwind-merge";
import {acceptErrorStatusCode, LocalStorageKeys} from "./constants";
import {AxiosError, HttpStatusCode} from "axios";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const saveAccessTokenToLS = (token: string) => {
    localStorage.setItem(LocalStorageKeys.accessToken, token)
}

export const getAccessTokenFromLS = () => localStorage.getItem(LocalStorageKeys.accessToken)

export const clearLocalStorage = () => localStorage.clear()

export const SaveUserToLocalStorage = (user: IUser) => {
    localStorage.setItem(LocalStorageKeys.user, JSON.stringify(user));
};

export const GetUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem(LocalStorageKeys.user);
        if (!user) return null;
        return JSON.parse(user);
    }
};

export const ClearUserFromLocalStorage = () =>
    localStorage.removeItem(LocalStorageKeys.user);

export const IsAcceptErrorStatusCode = (error: AxiosError) =>
    acceptErrorStatusCode.includes(
        error.response?.status || HttpStatusCode.InternalServerError
    );
