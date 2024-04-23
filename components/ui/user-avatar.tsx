import {Avatar, AvatarFallback} from "./avatar";
import Image from "next/image";

interface IUserAvatar {
    src?: string;
    displayName?: string;
}

export const UserAvatar = ({src, displayName}: IUserAvatar) => {
    return (
        <Avatar className="cursor-pointer items-center bg-primary-foreground select-none">
            {src && (
                <Image
                    width={40}
                    height={40}
                    className="object-cover"
                    src={`${process.env.NEXT_PUBLIC_API_URL}${src}`}
                    alt={"Avatar"}
                />
            )}
            {!src && <AvatarFallback>{displayName}</AvatarFallback>}
        </Avatar>
    );
};
