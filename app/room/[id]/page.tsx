"use client";

import YouTube from "react-youtube";
import { ListVideo, MessageSquare, Users, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RoomPage() {
    const opts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    return (
        <div className="flex flex-col xl:flex-row">
            <div className="flex flex-col flex-grow">
                <YouTube
                    className="w-full aspect-video mb-2"
                    iframeClassName="w-full h-full rounded-xl"
                    videoId={"zbtbk9hqkhY"}
                    opts={opts} // defaults -> ''
                />
                <h2 className="font-semibold line-clamp-2 text-xl">
                    NHẠC NGHE TRÊN GIƯỜNG #6🎧NHẠC TRẺ REMIX 2024🎧MIXSET HOUSE
                    LAK & DEEP HOUSE 2024🎧VIET DEEP 2024
                </h2>
            </div>

            <div className="rounded-xl border-border w-96 border flex flex-col ml-4 max-h-[600px] relative">
                <span className="border-b border-border p-4 flex justify-between items-center">
                    <p className="font-semibold">Thành viên</p>
                    <X
                        className="cursor-pointer hover:opacity-80"
                        size={16}
                    />
                </span>
                <ScrollArea className="flex flex-col mt-1">
                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>

                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>

                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>

                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>

                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>

                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>

                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>

                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>

                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>

                    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-primary-foreground transition-colors">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                            <p className="text-sm line-clamp-1 text-ellipsis">
                                Chủ phòng 1
                            </p>
                            <small className="text-xs text-muted-foreground">
                                Chủ phòng
                            </small>
                        </span>
                    </div>
                </ScrollArea>
                <div className="flex justify-center w-full p-2">
                    <Tabs
                        defaultValue="participants"
                        className="w-full"
                    >
                        <TabsList className="bg-primary-foreground w-full">
                            <TabsTrigger
                                value="participants"
                                className="w-full"
                            >
                                <Users
                                    size={16}
                                    className="mr-1"
                                />
                                Thành viên
                            </TabsTrigger>
                            <TabsTrigger
                                value="chat"
                                className="w-full"
                            >
                                <MessageSquare
                                    size={16}
                                    className="mr-1"
                                />
                                Nhắn tin
                            </TabsTrigger>
                            <TabsTrigger
                                value="playlist"
                                className="w-full"
                            >
                                <ListVideo
                                    size={16}
                                    className="mr-1"
                                />{" "}
                                Danh sách
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
