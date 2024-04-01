"use client";

import { ListVideo, MessageSquare, Users, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YoutubePlayer } from "@/components/videos/YoutubePlayer";
import { ParticipantList } from "@/components/room/ParticipantList";
import { useMemo, useState } from "react";
import React from "react";
import { Chat } from "@/components/room/chat";

interface ITabs {
  [key: string]: {
    title: string;
    component: React.ReactNode;
  };
}

export default function RoomPage() {
  const [tabMenu, setTabMenu] = useState<string>("participants");

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
      participants: {
        title: "Người tham gia",
        component: <ParticipantList participants={participants} />,
      },
      chat: {
        title: "Trò chuyện",
        component: <Chat />,
      },
      playlist: {
        title: "Danh sách",
        component: <ParticipantList participants={participants} />,
      },
    };
  }, [participants]);

  const handleChangeTab = (tab: string) => {
    setTabMenu(tab);
  };

  return (
    <div className="flex flex-col xl:flex-row">
      <YoutubePlayer
        videoTitle="NHẠC NGHE TRÊN GIƯỜNG #6🎧NHẠC TRẺ REMIX 2024🎧MIXSET HOUSE LAK & DEEP
      HOUSE 2024🎧VIET DEEP 2024"
      />

      <div className="rounded-xl border-border w-96 border flex flex-col ml-4 max-h-[600px] relative">
        <span className="border-b border-border p-4 flex justify-between items-center">
          <p className="font-semibold">{tabs[tabMenu].title}</p>
          <X className="cursor-pointer hover:opacity-80" size={16} />
        </span>

        {Object.keys(tabs).map((tab, index) => {
          return (
            tab === tabMenu && (
              <React.Fragment key={index}>{tabs[tab].component}</React.Fragment>
            )
          );
        })}

        <div className="flex justify-center w-full p-2">
          <Tabs defaultValue={tabMenu} className="w-full">
            <TabsList className="bg-primary-foreground w-full">
              <TabsTrigger
                value="participants"
                className="w-full"
                onClick={() => handleChangeTab("participants")}
              >
                <Users size={16} className="mr-1" />
                Thành viên
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="w-full"
                onClick={() => handleChangeTab("chat")}
              >
                <MessageSquare size={16} className="mr-1" />
                Nhắn tin
              </TabsTrigger>
              <TabsTrigger
                value="playlist"
                className="w-full"
                onClick={() => handleChangeTab("playlist")}
              >
                <ListVideo size={16} className="mr-1" /> Danh sách
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
