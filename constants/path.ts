const settingsPath = "/settings";

const routePath = {
    home: "/",
    login: "/login",
    logout: "/logout",
    register: "/register",
    party: "/party",
    settingProfile: settingsPath + "/profile",
    changePassword: settingsPath + "/change-password",
    settingSystem: settingsPath + "/system",
};

const privatePath = [
    routePath.home,
    routePath.party,
    routePath.settingProfile,
    routePath.changePassword,
    routePath.settingSystem,
];

const authPath = [routePath.login, routePath.register];

export { routePath, authPath, privatePath };
