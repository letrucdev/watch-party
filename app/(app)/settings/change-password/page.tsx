"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { userApi } from "@/lib/apis";
import { IsAcceptErrorStatusCode } from "@/lib/utils";
import { FormErrorResponse } from "@/types/api.type";
import {
    ChangeUserPasswordSchema,
    IChangeUserPassword,
} from "@api/schema/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<IChangeUserPassword>({
        resolver: zodResolver(ChangeUserPasswordSchema),
    });

    const changePasswordMutation = useMutation({
        mutationFn: userApi.ChangePassword,
        onSuccess: (response) => {
            toast.success("Thông báo", { description: response.message });
            reset();
        },
        onError: (error) => {
            if (error instanceof AxiosError && IsAcceptErrorStatusCode(error)) {
                const formError: FormErrorResponse = error.response?.data;
                Object.keys(formError).forEach((key) => {
                    setError(key as keyof IChangeUserPassword, {
                        message: formError[key as keyof IChangeUserPassword][0],
                    });
                });
            }
        },
    });

    const onSubmit: SubmitHandler<IChangeUserPassword> = (data) =>
        changePasswordMutation.mutate(data);

    return (
        <div className="flex flex-col flex-grow">
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Đổi mật khẩu</h2>
                <p className="text-muted-foreground">
                    Đổi mật khẩu cho tài khoản
                </p>
                <Separator className="my-4" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-3 space-y-8">
                    {/* Current Password */}
                    <div className="flex flex-col space-y-2 w-full">
                        <Label
                            htmlFor="oldPassword"
                            className="font-medium text-sm"
                        >
                            Mật khẩu hiện tại
                        </Label>
                        <Input
                            {...register("oldPassword")}
                            id="oldPassword"
                            type="password"
                        />
                        <p
                            className={`${
                                errors.oldPassword
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            } text-[0.8rem]`}
                        >
                            {errors.oldPassword?.message}
                        </p>
                    </div>

                    {/* New Password  */}
                    <div className="flex flex-col space-y-2 w-full">
                        <Label
                            htmlFor="newPassword"
                            className="font-medium text-sm"
                        >
                            Mật khẩu mới
                        </Label>
                        <Input
                            {...register("newPassword")}
                            id="newPassword"
                            type="password"
                        />
                        <p
                            className={`${
                                errors.newPassword
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            } text-[0.8rem]`}
                        >
                            {errors.newPassword?.message ||
                                "Mật khẩu cần tối thiểu 6 ký tự và khác mật khẩu cũ để đảm bảo độ bảo mật cho tài khoản"}
                        </p>
                    </div>

                    {/* Confirm new password */}
                    <div className="flex flex-col space-y-2 w-full">
                        <Label htmlFor="confirmNewPassword">
                            Nhập lại mật khẩu mới
                        </Label>
                        <Input
                            {...register("confirmNewPassword")}
                            id="confirmNewPassword"
                            type="password"
                        />
                        <p
                            className={`${
                                errors.confirmNewPassword
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            } text-[0.8rem]`}
                        >
                            {errors.confirmNewPassword?.message ||
                                "Nhập lại chính xác mật khẩu mới của bạn"}
                        </p>
                    </div>

                    <Button
                        className="w-64"
                        disabled={changePasswordMutation.isPending}
                    >
                        {changePasswordMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Đổi mật khẩu
                    </Button>
                </div>
            </form>
        </div>
    );
}
