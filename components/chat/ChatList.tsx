import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useMemo } from "react";

import dynamic from "next/dynamic";

const ChatItem = dynamic(() => import("@/components/chat/ChatItem"));

export default function Chat() {
    const chatList = useMemo(() => {
        return [];
    }, []);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <ScrollArea className="flex flex-col flex-grow">
                {/*  {chatList?.map((item) => {
                    return (
                        <ChatItem
                            key={item.id}
                            content={item.content}
                            sender={item.sender}
                        />
                    );
                })} */}
            </ScrollArea>
            <form className="px-2 pt-2">
                <Input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    className="focus-visible:ring-transparent"
                />
            </form>
        </div>
    );
}
