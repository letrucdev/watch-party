export interface IUserSetting {
    animationEnable: number;
    ecoMode: number;
}

export interface IUser {
    id: number;
    displayName: string;
    email: string;
    avatar?: string;
    setting: IUserSetting;
}
