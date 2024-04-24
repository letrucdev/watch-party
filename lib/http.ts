import { routePath } from "@/constants/path";
import axios, {
    AxiosError,
    AxiosInstance,
    HttpStatusCode,
    InternalAxiosRequestConfig,
} from "axios";
import { IsAcceptErrorStatusCode, saveAccessTokenToLS } from "./utils";
import { toast } from "sonner";
import { LocalStorageKeys } from "@lib/constants";
import { logout } from "@lib/auth";

const NO_AUTH_PATH = ["/auth/login"];

const includeAccessToken = (request: InternalAxiosRequestConfig<unknown>) => {
    const accessToken =
        localStorage.getItem(LocalStorageKeys.accessToken) || "";
    if (request.headers !== undefined) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    }
};

class Http {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            timeout: 5000,
        });

        this.instance.interceptors.request.use((request) => {
            if (!NO_AUTH_PATH.includes(request.url!))
                includeAccessToken(request);

            return request;
        });

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;

                if (NO_AUTH_PATH.includes(url!)) {
                    saveAccessTokenToLS(response.data.accessToken);
                }

                return response;
            },
            (error: AxiosError) => {
                if (error.response?.status === HttpStatusCode.Unauthorized) {
                    //Invalid token => logout
                    return logout();
                }

                if (!IsAcceptErrorStatusCode(error)) {
                    const data: any | undefined = error.response?.data;
                    const message = data?.message || error?.message;
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
