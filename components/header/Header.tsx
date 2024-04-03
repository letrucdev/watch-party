"use client";
import Link from "next/link";
import { InputSearch } from "@/components/ui/input-search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut, Settings, Users } from "lucide-react";
import { authPath, routePath } from "@/constants/path";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export const Header = () => {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    const { authUser, logout } = useAuth();

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header
            className={
                "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            }
        >
            <div className={"container flex items-center p-4"}>
                <h1 className="text-2xl font-extrabold dark:text-white flex-shrink-0">
                    <Link
                        href={routePath.home}
                        className="dark:bg-gradient-to-r bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        Watch Party
                    </Link>
                </h1>
                {!authPath.includes(pathname) && (
                    <div className={"md:flex justify-center w-full hidden"}>
                        <InputSearch
                            type="text"
                            placeholder="Đường dẫn video hoặc từ khóa"
                            className={"w-96"}
                        />
                    </div>
                )}

                <div
                    className={"flex flex-shrink-0 ml-auto space-x-2"}
                    suppressHydrationWarning
                >
                    <ThemeToggle />

                    {isClient && authUser && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="ml-4 cursor-pointer">
                                    <AvatarImage src={authUser.avatar} />
                                    <AvatarFallback>
                                        {authUser.displayName.split(" ")[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="mt-2 max-w-60 min-w-60"
                                align="end"
                            >
                                <span className="flex flex-col p-2">
                                    <p className="text-sm line-clamp-1 text-ellipsis font-semibold">
                                        {authUser.displayName}
                                    </p>
                                    <small className="text-muted-foreground line-clamp-1 text-ellipsis">
                                        {authUser.email}
                                    </small>
                                </span>
                                <DropdownMenuSeparator />
                                <Link href={routePath.settingProfile}>
                                    <DropdownMenuItem>
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>Tài khoản</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={routePath.settingSystem}>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Hệ thống</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Đăng xuất</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {isClient && !authUser && (
                        <Button
                            asChild
                            variant={"outline"}
                        >
                            <Link href={routePath.login}>Đăng nhập</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};
