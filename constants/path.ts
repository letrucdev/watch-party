const settingsPath = "/settings";

const routePath = {
    home: "/",
    login: "/login",
    register: "/register",
    party: "/party",
    settingProfile: settingsPath + "/profile",
    changePassword: settingsPath + "/change-password",
    settingSystem: settingsPath + "/system",
};

const authPath = [routePath.login, routePath.register];

export { routePath, authPath };
