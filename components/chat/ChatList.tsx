import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useMemo } from "react";

import dynamic from "next/dynamic";

const ChatItem = dynamic(() => import("@/components/chat/ChatItem"));

export default function Chat() {
    const chatList = useMemo(() => {
        return [
            {
                id: 1,
                content: "Hello!",
                sender: {
                    id: 1,
                    avatarSrc: "https://example.com/avatar1.png",
                    username: "user1",
                },
            },
            {
                id: 2,
                content: "Hi there!",
                sender: {
                    id: 2,
                    avatarSrc: "https://example.com/avatar2.png",
                    username: "user2",
                },
            },
            {
                id: 3,
                content: "How are you?",
                sender: {
                    id: 3,
                    avatarSrc: "https://example.com/avatar3.png",
                    username: "user3",
                },
            },
            {
                id: 4,
                content: "I'm doing well, thanks!",
                sender: {
                    id: 1,
                    avatarSrc: "https://example.com/avatar1.png",
                    username: "user1",
                },
            },
            {
                id: 5,
                content: "What about you?",
                sender: {
                    id: 2,
                    avatarSrc: "https://example.com/avatar2.png",
                    username: "user2",
                },
            },
            {
                id: 6,
                content: "I'm good too!",
                sender: {
                    id: 3,
                    avatarSrc: "https://example.com/avatar3.png",
                    username: "user3",
                },
            },
            {
                id: 7,
                content: "Nice to hear!",
                sender: {
                    id: 1,
                    avatarSrc: "https://example.com/avatar1.png",
                    username: "user1",
                },
            },
            {
                id: 8,
                content: "What have you been up to?",
                sender: {
                    id: 2,
                    avatarSrc: "https://example.com/avatar2.png",
                    username: "user2",
                },
            },
            {
                id: 9,
                content: "Just working on some projects.",
                sender: {
                    id: 3,
                    avatarSrc: "https://example.com/avatar3.png",
                    username: "user3",
                },
            },
            {
                id: 10,
                content: "Sounds interesting!",
                sender: {
                    id: 1,
                    avatarSrc: "https://example.com/avatar1.png",
                    username: "user1",
                },
            },
            {
                id: 11,
                content: "Yeah, it's pretty cool.",
                sender: {
                    id: 2,
                    avatarSrc: "https://example.com/avatar2.png",
                    username: "user2",
                },
            },
            {
                id: 12,
                content: "I'd love to hear more about it sometime.",
                sender: {
                    id: 3,
                    avatarSrc: "https://example.com/avatar3.png",
                    username: "user3",
                },
            },
            {
                id: 13,
                content: "Sure, I can tell you more later.",
                sender: {
                    id: 1,
                    avatarSrc: "https://example.com/avatar1.png",
                    username: "user1",
                },
            },
            {
                id: 14,
                content: "Thanks!",
                sender: {
                    id: 2,
                    avatarSrc: "https://example.com/avatar2.png",
                    username: "user2",
                },
            },
            {
                id: 15,
                content: "No problem!",
                sender: {
                    id: 3,
                    avatarSrc: "https://example.com/avatar3.png",
                    username: "user3",
                },
            },
        ];
    }, []);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <ScrollArea className="flex flex-col flex-grow">
                {chatList.map((item) => {
                    return (
                        <ChatItem
                            key={item.id}
                            content={item.content}
                            sender={item.sender}
                        />
                    );
                })}
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
