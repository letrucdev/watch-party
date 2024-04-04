import { HttpStatusCode } from "axios";

export const LocalStorageKeys = {
    user: "user",
};

export const CookiesKeys = {
    accessToken: "__watch_party_accessToken",
};

export const acceptErrorStatusCode = [
    HttpStatusCode.BadRequest,
    HttpStatusCode.Unauthorized,
];
