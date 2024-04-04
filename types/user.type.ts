export interface IUserSetting {
    animationEnable: boolean;
    ecoMode: boolean;
}

export interface IUser {
    id: number;
    displayName: string;
    email: string;
    avatar?: string;
    setting: IUserSetting;
}
