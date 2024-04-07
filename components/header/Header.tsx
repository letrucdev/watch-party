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
import { privatePath, routePath } from "@/constants/path";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/apis";
import { Skeleton } from "@components/ui/skeleton";
import { UserAvatar } from "@components/ui/user-avatar";
import { SearchForm } from "@components/header/SearchForm";
import { useUser } from "@/hooks/useUser";
import { Suspense } from "react";

export const Header = () => {
    const pathname = usePathname();
    const isPrivatePath = privatePath.some((path) => pathname.startsWith(path));

    const { user, isPending } = useUser();

    const logoutMutation = useMutation({
        mutationFn: authApi.Logout,
    });

    const handleLogout = () => logoutMutation.mutate();

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

                {isPrivatePath && (
                    <Suspense>
                        <SearchForm />
                    </Suspense>
                )}

                <div className={"flex flex-shrink-0 ml-auto space-x-2"}>
                    <ThemeToggle />
                    {isPrivatePath && isPending && (
                        <Skeleton className="w-10 h-10 bg-primary-foreground rounded-full" />
                    )}
                    {isPrivatePath && user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                                <UserAvatar
                                    src={user?.avatar}
                                    displayName={user?.displayName
                                        .split("")
                                        .at(0)
                                        ?.toUpperCase()}
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="mt-2 max-w-60 min-w-60"
                                align="end"
                            >
                                <span className="flex flex-col p-2">
                                    <p className="text-sm line-clamp-1 text-ellipsis font-semibold">
                                        {user?.displayName}
                                    </p>
                                    <small className="text-muted-foreground line-clamp-1 text-ellipsis">
                                        {user?.email}
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
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
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
