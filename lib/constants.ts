import { HttpStatusCode } from "axios";

export const LocalStorageKeys = {
    user: "user",
};

export const acceptErrorStatusCode = [
    HttpStatusCode.BadRequest,
    HttpStatusCode.Unauthorized,
];
