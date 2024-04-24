import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface IUserAvatar {
    src?: string;
    displayName?: string;
}

export const UserAvatar = ({ src, displayName }: IUserAvatar) => {
    return (
        <Avatar className='cursor-pointer items-center bg-primary-foreground select-none'>
            <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}${src}`} />
            <AvatarFallback>{displayName}</AvatarFallback>
            {/* {src && (
                <Image
                    unoptimized
                    width={120}
                    height={120}
                    src={`${process.env.NEXT_PUBLIC_API_URL}${src}`}
                    alt={"Avatar"}
                />
            )} */}
        </Avatar>
    );
};
