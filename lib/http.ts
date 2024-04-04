import { routePath } from "@/constants/path";
import axios, { AxiosError, AxiosInstance } from "axios";
import {
    ClearUserFromLocalStorage,
    IsAcceptErrorStatusCode,
    SaveUserToLocalStorage,
} from "./utils";
import { ILoginResponse } from "@/types/api.type";
import { toast } from "sonner";

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: "/api",
            timeout: 5000,
        });

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;
                if (url === routePath.login) {
                    /*                     SaveUserToLocalStorage(
                        (response.data as ILoginResponse).user
                    ); */
                    window.location.href = routePath.home;
                }
                if (url === routePath.logout) {
                    ClearUserFromLocalStorage();
                    window.location.href = routePath.login;
                }
                return response;
            },
            (error: AxiosError) => {
                if (!IsAcceptErrorStatusCode(error)) {
                    const data: any | undefined = error.response?.data;
                    const message = data.message || error.message;
                    toast.error("Lỗi", { description: message });
                    console.log(`❌ Unexpected Error: ${message}`);
                }
                return Promise.reject(error);
            }
        );
    }
}

const http = new Http().instance;

export default http;
