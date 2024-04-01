import { IChatItem } from "@/types/chat.type";

export const ChatItem = ({ content, sender }: IChatItem) => {
  return (
    <div className="text-sm hover:bg-primary-foreground py-2 px-4 cursor-pointer">
      <span className="font-semibold mr-2 text-muted-foreground">
        {sender.username}
      </span>
      <span>{content}</span>
    </div>
  );
};
