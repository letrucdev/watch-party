import {
    IChangeSettingResponse,
    ILoginRequest,
    ILoginResponse,
    IRegisterRequest,
    ISearchVideoResult,
    IUpdateUserInfoRequest,
    IUploadAvatarResponse,
    IYoutubeVideoItem,
    SuccessResponse,
} from "@/types/api.type";
import http from "./http";
import { IChangeUserPassword } from "@api/schema/User";
import { IUserSetting } from "@/types/user.type";

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
    UpdateInfo: async (data: IUpdateUserInfoRequest) => {
        try {
            const updateUser = await http.put<ILoginResponse>("/user", data);
            return updateUser.data;
        } catch (err) {
            throw err;
        }
    },
    UploadAvatar: async (formData: FormData) => {
        try {
            const uploadAvatar = await http.post<IUploadAvatarResponse>(
                "/user/avatar",
                formData
            );
            return uploadAvatar.data;
        } catch (err) {
            throw err;
        }
    },
    ChangeSystemSetting: async (data: IUserSetting) => {
        try {
            const changeSystemSetting = await http.put<IChangeSettingResponse>(
                "/user/system-setting",
                data
            );

            return changeSystemSetting.data;
        } catch (err) {
            throw err;
        }
    },
};

const youtubeApi = {
    Videos: async () => {
        try {
            const videos = await http.get<IYoutubeVideoItem[]>(
                "/youtube/videos"
            );
            return videos.data;
        } catch (error) {
            throw error;
        }
    },
    Search: async (query: string) => {
        try {
            const search = await http.get<ISearchVideoResult>(
                "/youtube/search",
                {
                    params: {
                        q: query,
                    },
                }
            );
            return search.data;
        } catch (error) {
            throw error;
        }
    },
};

export { authApi, userApi, youtubeApi };
