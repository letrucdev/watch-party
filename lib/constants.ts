import {HttpStatusCode} from "axios";

export const LocalStorageKeys = {
    user: "user",
    accessToken: "accessToken",
};

export const CookiesKeys = {
    accessToken: "__watch_party_accessToken",
};

export const acceptErrorStatusCode = [
    HttpStatusCode.BadRequest,
    HttpStatusCode.Forbidden
];

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg"];
export const MAX_IMAGE_SIZE = 1024 * 1024 * 5; //5mb
