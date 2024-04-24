import {
    IAddVideoToPlaylistResponse,
    ICreatePartyResponse,
    IGetPartyResponse,
    IJoinPartyResponse,
    ILoginRequest,
    ILoginResponse,
    IPlaylistVideo,
    IRegisterRequest,
    ISearchVideoResult,
    IUpdateUserInfoRequest,
    IUpdateUserInfoResponse,
    IUploadAvatarResponse,
    IYoutubeTrendingVideos,
} from "@/types/api.type";
import http from "./http";
import { IUser, IUserSetting } from "@/types/user.type";
import { IChangeUserPasswordSchema } from "@/schema/update-user.schema";

const authApi = {
    Login: async (data: ILoginRequest) => {
        try {
            const login = await http.post<ILoginResponse>("/auth/login", data);

            return login.data;
        } catch (err) {
            throw err;
        }
    },
    /*    Logout: async () => {
            try {
                await http.post("/logout");
            } catch (err) {
                throw err;
            }
        },*/
    Register: async (data: IRegisterRequest) => {
        try {
            const register = await http.post("/auth/register", data);
            return register.data;
        } catch (err) {
            throw err;
        }
    },
};

const userApi = {
    me: async () => {
        try {
            const user = await http.get<IUser>("/users/me");
            return user.data;
        } catch (err) {
            throw err;
        }
    },
    ChangePassword: async (data: IChangeUserPasswordSchema) => {
        try {
            const changePassword = await http.put<any>("/users/password", data);
            return changePassword.data;
        } catch (err) {
            throw err;
        }
    },
    UpdateInfo: async (data: IUpdateUserInfoRequest) => {
        try {
            const updateUser = await http.put<IUpdateUserInfoResponse>(
                "/users/me",
                data
            );
            return updateUser.data;
        } catch (err) {
            throw err;
        }
    },
    UploadAvatar: async (formData: FormData) => {
        try {
            const uploadAvatar = await http.post<IUploadAvatarResponse>(
                "/users/avatar",
                formData
            );
            return uploadAvatar.data;
        } catch (err) {
            throw err;
        }
    },
    ChangeSystemSetting: async (data: IUserSetting) => {
        try {
            const changeSystemSetting = await http.put<IUserSetting>(
                "/users/setting",
                data
            );

            return changeSystemSetting.data;
        } catch (err) {
            throw err;
        }
    },
};

const partyApi = {
    Get: async (partyId: string) => {
        try {
            const party = await http.get<IGetPartyResponse>(
                `/party/${partyId}`
            );

            return party.data;
        } catch (error) {
            throw error;
        }
    },
    Create: async () => {
        try {
            const createParty = await http.post<ICreatePartyResponse>(
                "/party/create"
            );

            return createParty.data;
        } catch (error) {
            throw error;
        }
    },
    Join: async (partyId: string) => {
        try {
            const joinParty = await http.post<IJoinPartyResponse>(
                `/party/join/${partyId}`
            );

            return joinParty.data;
        } catch (error) {
            throw error;
        }
    },
    AddVideoToPlaylist: async (partyId: string, video: IPlaylistVideo) => {
        try {
            const addVideo = await http.post<IAddVideoToPlaylistResponse>(
                `/party/${partyId}/playlist`,
                video
            );

            return addVideo.data;
        } catch (error) {
            throw error;
        }
    },
    ExitRoom: async (partyId: string) => {
        try {
            const exitRoom = await http.delete<any>(`/party/${partyId}/exit`);

            return exitRoom.data;
        } catch (error) {
            throw error;
        }
    },
};

const youtubeApi = {
    Videos: async () => {
        try {
            const videos = await http.get<IYoutubeTrendingVideos>(
                "/youtube/trending"
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
                        query,
                    },
                }
            );
            return search.data;
        } catch (error) {
            throw error;
        }
    },
};

export { authApi, userApi, partyApi, youtubeApi };
