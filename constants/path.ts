const settingsPath = "/settings";

const routePath = {
    home: "/home",
    login: "/login",
    logout: "/logout",
    register: "/register",
    party: "/party",
    search: "/search",
    settingProfile: settingsPath + "/profile",
    changePassword: settingsPath + "/change-password",
    settingSystem: settingsPath + "/system",
};

const apiPath = {
    login: "/auth/login"
}

const privatePath = [
    routePath.home,
    routePath.party,
    routePath.settingProfile,
    routePath.changePassword,
    routePath.settingSystem,
    routePath.search,
];

const authPath = [routePath.login, routePath.register];

export { routePath, authPath, privatePath, apiPath };
