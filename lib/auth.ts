import {clearLocalStorage} from "@lib/utils";
import {routePath} from "@constants/path";

export const logout = () => {
    clearLocalStorage()
    window.location.href = routePath.login
}