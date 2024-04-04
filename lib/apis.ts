import {
    ILoginRequest,
    ILoginResponse,
    IRegisterRequest,
    SuccessResponse,
} from "@/types/api.type";
import http from "./http";
import { IChangeUserPassword, IUpdateUserInfo } from "@api/schema/User";

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

const userApi = {
    Info: async () => {
        try {
            const user = await http.get<ILoginResponse>("/user");
            return user.data;
        } catch (err) {
            throw err;
        }
    },
    ChangePassword: async (data: IChangeUserPassword) => {
        try {
            const changePassword = await http.put<SuccessResponse>(
                "/user/password",
                data
            );
            return changePassword.data;
        } catch (err) {
            throw err;
        }
    },
    UpdateInfo: async (data: IUpdateUserInfo) => {
        try {
            const updateUser = await http.put<ILoginResponse>("/user", data);
            return updateUser.data;
        } catch (err) {
            throw err;
        }
    },
};

export { authApi, userApi };
