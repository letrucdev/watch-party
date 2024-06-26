import { CldImage } from "next-cloudinary";
import { Avatar, AvatarFallback } from "./avatar";
import { DropdownMenuTrigger } from "./dropdown-menu";

interface IUserAvatar {
    src?: string;
    displayName?: string;
}

export const UserAvatar = ({ src, displayName }: IUserAvatar) => {
    return (
        <DropdownMenuTrigger asChild>
            <Avatar className="ml-4 cursor-pointer items-center bg-primary-foreground">
                {src && (
                    <CldImage
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        src={src}
                        alt={"Avatar"}
                    />
                )}
                {!src && <AvatarFallback>{displayName}</AvatarFallback>}
            </Avatar>
        </DropdownMenuTrigger>
    );
};
