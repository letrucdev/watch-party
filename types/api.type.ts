import { z } from "zod";
import { IUser, IUserSetting } from "./user.type";
import { UpdateUserInfoSchema } from "@api/schema/User";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
}

export interface IUpdateUserInfoRequest
    extends Omit<z.infer<typeof UpdateUserInfoSchema>, "avatar"> {
    avatar?: string;
}

export interface FormErrorResponse {
    [key: string]: string[];
}

export interface SuccessResponse {
    message: string;
}

export interface ILoginResponse extends SuccessResponse {
    user: IUser;
}

export interface IUploadAvatarResponse extends SuccessResponse {
    avatar: string;
}

export interface IChangeSettingResponse extends SuccessResponse {
    setting: IUserSetting;
}
