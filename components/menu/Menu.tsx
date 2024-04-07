"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";

import { ListVideo, MessageSquare, Users, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuLoading from "@/components/menu/MenuLoading";

const ParticipantList = dynamic(
    () => import("@/components/participant/ParticipantList"),
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
    const [tabMenu, setTabMenu] = useState<string>("playlist");

    const tabs: ITabs = useMemo(() => {
        return {
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

            participants: {
                icon: (
                    <Users
                        size={16}
                        className="mr-1"
                    />
                ),
                title: "Người tham gia",
                component: <ParticipantList />,
            },
        };
    }, []);

    const handleChangeTab = (tab: string) => setTabMenu(tab);

    return (
        <div className="rounded-xl border-border border flex flex-col h-[600px] max-h-[600px] min-h-[600px]">
            <span className="border-b border-border p-4 flex justify-between items-center">
                <p className="font-semibold">{tabs[tabMenu].title}</p>
                {/*  <X
                    className="cursor-pointer hover:opacity-80"
                    size={16}
                /> */}
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
