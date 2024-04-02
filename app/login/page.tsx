import { Button } from "@/components/ui/button";
import { routePath } from "@/constants/path";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="flex flex-grow justify-center items-center">
            <div className="flex border-border border rounded-[0.5rem] overflow-hidden mt-14">
                <div className="hidden lg:flex flex-grow overflow-hidden w-[23rem] h-[40rem] border-r">
                    <Image
                        className="object-cover"
                        width={3072}
                        height={3072}
                        src={"/assets/images/banner.png"}
                        alt="banner"
                    />
                </div>
                <div className="flex p-12">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Đăng nhập
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Nhập email và mật khẩu để đăng nhập
                            </p>
                        </div>
                        <div className="grid gap-6">
                            <form>
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <input
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            id="email"
                                            placeholder="youremail@email.com"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            type="email"
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <input
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            id="password"
                                            placeholder="Nhập mật khẩu"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            type="password"
                                        />
                                    </div>
                                    <Button>Đăng nhập</Button>
                                </div>
                            </form>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Chưa có tài khoản ?
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant={"outline"}
                                asChild
                            >
                                <Link href={routePath.register}>Đăng ký</Link>
                            </Button>
                        </div>
                        {/*  <p className="px-8 text-center text-sm text-muted-foreground">
                                By clicking continue, you agree to our{" "}
                                <a
                                    className="underline underline-offset-4 hover:text-primary"
                                    href="/terms"
                                >
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                    className="underline underline-offset-4 hover:text-primary"
                                    href="/privacy"
                                >
                                    Privacy Policy
                                </a>
                                .
                            </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
