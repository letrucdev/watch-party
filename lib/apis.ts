import {
    ILoginRequest,
    ILoginResponse,
    IRegisterRequest,
    SuccessResponse,
} from "@/types/api.type";
import http from "./http";

const authApi = {
    Login: async (data: ILoginRequest) => {
        try {
            const login = await http.post<ILoginResponse>("/login", data);

            return login.data.user;
        } catch (err) {
            throw err;
        }
    },
    Logout: async () => {
        try {
            await http.post("/logout");
        } catch (err) {
            throw err;
        }
    },
    Register: async (data: IRegisterRequest) => {
        try {
            const register = await http.post<SuccessResponse>(
                "/register",
                data
            );
            return register.data;
        } catch (err) {
            throw err;
        }
    },
};

export { authApi };
