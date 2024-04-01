import Link from "next/link";
import { InputSearch } from "@/components/ui/input-search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
    return (
        <header
            className={
                "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            }
        >
            <div className={"container flex items-center p-4"}>
                <h1 className="text-2xl font-extrabold dark:text-white flex-shrink-0">
                    <Link
                        href={"/"}
                        className="dark:bg-gradient-to-r bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        Watch Party
                    </Link>
                </h1>
                <div className={"md:flex justify-center w-full hidden"}>
                    <InputSearch
                        type="text"
                        placeholder="Đường dẫn video hoặc từ khóa"
                        className={"w-96"}
                    />
                </div>
                <div className={"flex flex-shrink-0 ml-auto"}>
                    <ThemeToggle />
                    <Avatar className="ml-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
};
