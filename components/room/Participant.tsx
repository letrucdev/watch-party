import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface IParticipant {
  id: number;
  avatarSrc: string;
  username: string;
}

export const Participant = ({ id, avatarSrc, username }: IParticipant) => {
  return (
    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
      <Avatar className="mr-2">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="flex flex-col">
        <p className="text-sm line-clamp-1 text-ellipsis">{username}</p>
        <small className="text-xs text-muted-foreground">Chủ phòng</small>
      </span>
    </div>
  );
};
