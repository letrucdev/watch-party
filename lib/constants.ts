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

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg"];
export const MAX_IMAGE_SIZE = 1024 * 1024 * 5; //10mb
