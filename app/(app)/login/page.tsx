"use client";

import { Button } from "@components/ui/button";
import { routePath } from "@/constants/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin, LoginSchema } from "@api/schema/Auth";
import { Input } from "@components/ui/input";
import { FormErrorResponse, ILoginRequest } from "@/types/api.type";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/apis";
import { AxiosError } from "axios";
import { IsAcceptErrorStatusCode } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ILogin>({ resolver: zodResolver(LoginSchema) });

    const loginMutation = useMutation({
        mutationFn: authApi.Login,
        onError: (error) => {
            if (error instanceof AxiosError && IsAcceptErrorStatusCode(error)) {
                const formError: FormErrorResponse = error.response?.data;
                Object.keys(formError).forEach((key) => {
                    setError(key as keyof ILogin, {
                        message: formError[key as keyof ILogin][0],
                    });
                });
            }
        },
    });

    const onSubmit: SubmitHandler<ILoginRequest> = (data) =>
        loginMutation.mutate(data);

    return (
        <div className="flex flex-grow justify-center items-center">
            <div className="flex border-border border rounded-[0.5rem] overflow-hidden mt-14">
                <div className="hidden lg:flex flex-grow overflow-hidden w-[23rem] h-[40rem] border-r">
                    <Image
                        priority
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
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <Input
                                            {...register("email", {
                                                required: true,
                                                min: 1,
                                            })}
                                            id="email"
                                            placeholder="youremail@email.com"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            type="email"
                                        />
                                        <p className="text-destructive text-sm font-medium pt-1">
                                            {errors.email?.message}
                                        </p>
                                    </div>
                                    <div className="grid gap-1">
                                        <Input
                                            {...register("password")}
                                            id="password"
                                            placeholder="Nhập mật khẩu"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            type="password"
                                        />
                                        <p className="text-destructive text-sm font-medium pt-1">
                                            {errors.password?.message}
                                        </p>
                                    </div>
                                    <Button disabled={loginMutation.isPending}>
                                        {loginMutation.isPending && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Đăng nhập
                                    </Button>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
