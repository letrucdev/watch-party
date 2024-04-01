"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListVideo, MessageSquare, Users, X } from "lucide-react";
import MenuLoading from "./MenuLoading";

const ParticipantList = dynamic(
    () => import("@/components/room/ParticipantList"),
    {
        loading: () => <MenuLoading />,
    }
);

const Chat = dynamic(() => import("@/components/chat/ChatList"), {
    loading: () => <MenuLoading />,
});

const PlayList = dynamic(() => import("@/components/playlist/PlayList"), {
    loading: () => <MenuLoading />,
});

interface ITabs {
    [key: string]: {
        icon: React.ReactNode;
        title: string;
        component: React.ReactNode;
    };
}

export default function Menu() {
    const [tabMenu, setTabMenu] = useState<string>("chat");

    const participants = useMemo(() => {
        return [
            {
                id: 1,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user1",
            },
            {
                id: 2,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user2",
            },
            {
                id: 3,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user3",
            },
            {
                id: 4,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user4",
            },
            {
                id: 5,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user5",
            },
            {
                id: 6,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user6",
            },
            {
                id: 7,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user7",
            },
            {
                id: 8,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user8",
            },
            {
                id: 9,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user9",
            },
            {
                id: 10,
                avatarSrc: "https://github.com/shadcn.png",
                username: "user10",
            },
        ];
    }, []);

    const tabs: ITabs = useMemo(() => {
        return {
            chat: {
                icon: (
                    <MessageSquare
                        size={16}
                        className="mr-1"
                    />
                ),
                title: "Trò chuyện",
                component: <Chat />,
            },
            playlist: {
                icon: (
                    <ListVideo
                        size={16}
                        className="mr-1"
                    />
                ),
                title: "Danh sách phát",
                component: <PlayList />,
            },
            participants: {
                icon: (
                    <Users
                        size={16}
                        className="mr-1"
                    />
                ),
                title: "Người tham gia",
                component: <ParticipantList participants={participants} />,
            },
        };
    }, [participants]);

    const handleChangeTab = (tab: string) => {
        setTabMenu(tab);
    };

    return (
        <div className="rounded-xl border-border w-[32rem] max-w-[32rem] border flex flex-col ml-4 max-h-[580px] min-h-[580px]">
            <span className="border-b border-border p-4 flex justify-between items-center">
                <p className="font-semibold">{tabs[tabMenu].title}</p>
                <X
                    className="cursor-pointer hover:opacity-80"
                    size={16}
                />
            </span>

            {Object.keys(tabs).map((tab, index) => {
                return (
                    tab === tabMenu && (
                        <React.Fragment key={index}>
                            {tabs[tab].component}
                        </React.Fragment>
                    )
                );
            })}

            <div className="flex justify-center w-full p-2">
                <Tabs
                    defaultValue={tabMenu}
                    className="w-full"
                >
                    <TabsList className="bg-primary-foreground w-full">
                        {Object.keys(tabs).map((tab, index) => {
                            return (
                                <TabsTrigger
                                    key={index}
                                    value={tab}
                                    className="w-full"
                                    onClick={() => handleChangeTab(tab)}
                                >
                                    {tabs[tab].icon}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
}
