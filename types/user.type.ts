export interface IUserSetting {
    animationEnable: boolean;
    ecoMode: boolean;
}

export interface IUser {
    id: number;
    displayName: string;
    email: string;
    changedEmail: boolean;
    avatar?: string;
    setting: IUserSetting;
}
