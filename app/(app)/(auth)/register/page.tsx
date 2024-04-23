"use client";

import {Button} from "@components/ui/button";
import {routePath} from "@constants/path";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {authApi} from "@lib/apis";
import {Input} from "@components/ui/input";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {FormErrorResponse} from "@type/api.type";
import {IsAcceptErrorStatusCode} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import Image from "next/image";
import Link from "next/link";
import {IRegisterSchema, RegisterSchema} from "@/schema/register.schema";

export default function RegisterPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
    } = useForm<IRegisterSchema>({resolver: zodResolver(RegisterSchema)});

    const registerMutation = useMutation({
        mutationFn: authApi.Register,
        onSuccess: () => {
            toast.success("Thông báo", {
                description: "Đăng ký tài khoản thành công",
            });
            router.push(routePath.login);
        },
        onError: (error) => {
            if (error instanceof AxiosError && IsAcceptErrorStatusCode(error)) {
                const formError: FormErrorResponse = error.response?.data;
                Object.keys(formError).forEach((key) => {
                    setError(key as keyof IRegisterSchema, {
                        message: formError[key as keyof IRegisterSchema][0],
                    });
                });
            }
        },
    });

    const onSubmit: SubmitHandler<IRegisterSchema> = (data) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="flex flex-grow justify-center items-center">
            <div className="flex border-border border rounded-[0.5rem] overflow-hidden mt-14">
                <div className="hidden lg:flex flex-grow overflow-hidden w-[23rem] h-[40rem] border-r">
                    <Image
                        priority
                        className="object-cover scale-110"
                        width={3072}
                        height={3072}
                        src={"/assets/images/banner-1.png"}
                        alt="banner"
                    />
                </div>
                <div className="flex p-12">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Đăng ký
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Nhập email và mật khẩu để đăng ký
                            </p>
                        </div>
                        <div className="grid gap-6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <Input
                                            {...register("displayName")}
                                            id="displayName"
                                            placeholder="Nhập tên hiển thị"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            type="text"
                                        />
                                        <p className="text-destructive text-sm font-medium pt-1">
                                            {errors.displayName?.message}
                                        </p>
                                    </div>
                                    <div className="grid gap-1">
                                        <Input
                                            {...register("email")}
                                            id="email"
                                            placeholder="Nhập email"
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
                                    <div className="grid gap-1">
                                        <Input
                                            {...register("confirmPassword")}
                                            id="confirmPassword"
                                            placeholder="Nhập lại mật khẩu"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            type="password"
                                        />
                                        <p className="text-destructive text-sm font-medium pt-1">
                                            {errors.confirmPassword?.message}
                                        </p>
                                    </div>
                                    <Button
                                        disabled={registerMutation.isPending}
                                    >
                                        {registerMutation.isPending && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        )}
                                        Đăng ký
                                    </Button>
                                </div>
                            </form>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t"/>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Đã có tài khoản ?
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant={"outline"}
                                asChild
                            >
                                <Link href={routePath.login}>Đăng nhập</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
