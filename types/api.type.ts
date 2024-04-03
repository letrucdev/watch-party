import { IUser } from "./user.type";

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

export interface FormErrorResponse {
    [key: string]: string[];
}

export interface SuccessResponse {
    message: string;
}

export interface ILoginResponse extends SuccessResponse {
    user: IUser;
}
