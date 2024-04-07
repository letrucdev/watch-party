import { IParticipant } from "@/types/participants.type";
import { UserAvatar } from "@components/ui/user-avatar";

export default function Participant({
    id,
    avatarSrc,
    username,
    isOwner,
}: IParticipant) {
    return (
        <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors space-x-2">
            <UserAvatar
                displayName={username}
                src={avatarSrc}
            />
            <span className="flex flex-col">
                <p className="text-sm line-clamp-1 text-ellipsis font-semibold">
                    {username}
                </p>
                <small className="text-muted-foreground line-clamp-1">
                    {isOwner ? "Chủ phòng" : "Thành viên"}
                </small>
            </span>
        </div>
    );
}
