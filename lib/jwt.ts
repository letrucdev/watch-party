import * as jose from "jose";
import { SignJWT } from "jose";

class JWT {
    private privateKey: string;

    constructor() {
        this.privateKey = process.env.JWT_PRIVATE_KEY ?? "ddwwwiiaaoo@@@!!##";
    }

    async SignToken(data: any) {
        /*    const token = jose.SignJWT(data, this.privateKey, {
            expiresIn: "7d",
        }); */
        try {
            const token = await new SignJWT(data)
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("7d")
                .sign(new TextEncoder().encode(this.privateKey));

            return token;
        } catch {}
    }

    VerifyToken(token: string) {
        try {
            const verified = jose.jwtVerify(
                token,
                new TextEncoder().encode(this.privateKey)
            );
            return verified;
        } catch (error) {
            throw error;
        }
    }
}

const jwt = new JWT();

export default jwt;
