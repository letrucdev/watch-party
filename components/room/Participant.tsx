import { IParticipant } from "@/types/participants.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Participant({ id, avatarSrc, username }: IParticipant) {
    return (
        <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
            <Avatar className="mr-2">
                <AvatarImage src={avatarSrc} />
                <AvatarFallback>
                    {username.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <span className="flex flex-col">
                <p className="text-sm line-clamp-1 text-ellipsis font-semibold">
                    {username}
                </p>
                <small className="text-muted-foreground line-clamp-1">
                    Chủ phòng
                </small>
            </span>
        </div>
    );
}
