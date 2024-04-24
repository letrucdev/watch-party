"use client";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut, Settings, Users } from "lucide-react";
import { routePath } from "@/constants/path";
import { UserAvatar } from "@components/ui/user-avatar";
import { SearchForm } from "@components/header/SearchForm";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/context/AuthContext";
import { AUTH_STATUS } from "@type/enum/auth.enum";

export const Header = () => {
    const { logout, isAuthenticated } = useAuth();
    const { user } = useUser();

    return (
        <header
            className={
                "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            }
        >
            <div className={"container flex items-center p-4"}>
                <h1 className='text-2xl font-extrabold dark:text-white flex-shrink-0'>
                    <Link
                        href={routePath.home}
                        className='dark:bg-gradient-to-r bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'
                    >
                        Watch Party
                    </Link>
                </h1>

                {isAuthenticated === AUTH_STATUS.AUTHENTICATED && (
                    <SearchForm />
                )}

                <div className={"flex flex-shrink-0 ml-auto space-x-2"}>
                    <ThemeToggle />
                    {isAuthenticated === AUTH_STATUS.AUTHENTICATED && (
                        <DropdownMenu>
                            <DropdownMenuTrigger className='outline-none'>
                                <UserAvatar
                                    src={user?.avatar}
                                    displayName={user?.displayName
                                        .split("")
                                        .at(0)
                                        ?.toUpperCase()}
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className='mt-2 max-w-60 min-w-60'
                                align='end'
                            >
                                <span className='flex flex-col p-2'>
                                    <p className='text-sm line-clamp-1 text-ellipsis font-semibold'>
                                        {user?.displayName}
                                    </p>
                                    <small className='text-muted-foreground line-clamp-1 text-ellipsis'>
                                        {user?.email}
                                    </small>
                                </span>
                                <DropdownMenuSeparator />
                                <Link href={routePath.settingProfile}>
                                    <DropdownMenuItem>
                                        <Users className='mr-2 h-4 w-4' />
                                        <span>Tài khoản</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={routePath.settingSystem}>
                                    <DropdownMenuItem>
                                        <Settings className='mr-2 h-4 w-4' />
                                        <span>Hệ thống</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className='mr-2 h-4 w-4' />
                                    <span>Đăng xuất</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    );
};
