"use client";
import Link from "next/link";
import { InputSearch } from "@/components/ui/input-search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut, Settings, Users } from "lucide-react";
import { privatePath, routePath } from "@/constants/path";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi, userApi } from "@/lib/apis";
import { Skeleton } from "@components/ui/skeleton";
import { UserAvatar } from "@components/ui/user-avatar";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISearchVideoForm, SearchVideoSchema } from "@api/schema/Api";
import { zodResolver } from "@hookform/resolvers/zod";

export const Header = () => {
    const pathname = usePathname();
    const router = useRouter();

    const searchParams = useSearchParams();
    const search = searchParams.get("q");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISearchVideoForm>({
        resolver: zodResolver(SearchVideoSchema),
        values: { query: search ?? "" },
    });

    const onSubmit: SubmitHandler<ISearchVideoForm> = (data) =>
        router.push(`${routePath.search}?q=${data.query}`);

    const { data, isPending, isSuccess } = useQuery({
        queryKey: ["user"],
        staleTime: Infinity,
        queryFn: userApi.Info,
    });

    const logoutMutation = useMutation({
        mutationFn: authApi.Logout,
    });

    const handleLogout = () => logoutMutation.mutate();

    const isPrivatePath = privatePath.some((path) => pathname.startsWith(path));

    const user = data?.user;

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
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={"md:flex justify-center w-full hidden"}
                    >
                        <InputSearch
                            {...register("query")}
                            type="text"
                            placeholder="Đường dẫn video hoặc từ khóa"
                            className={"w-96"}
                        />
                    </form>
                )}

                <div className={"flex flex-shrink-0 ml-auto space-x-2"}>
                    <ThemeToggle />
                    {isPrivatePath && isPending && (
                        <Skeleton className="w-10 h-10 bg-primary-foreground rounded-full" />
                    )}
                    {isPrivatePath && isSuccess && (
                        <DropdownMenu>
                            <UserAvatar
                                src={user?.avatar}
                                displayName={user?.displayName
                                    .split("")
                                    .at(0)
                                    ?.toUpperCase()}
                            />
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

                    {/* {isClient && !isAuthenticated && (
                        <Button
                            asChild
                            variant={"outline"}
                        >
                            <Link href={routePath.login}>Đăng nhập</Link>
                        </Button>
                    )} */}
                </div>
            </div>
        </header>
    );
};
