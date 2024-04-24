"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";
import { userApi } from "@/lib/apis";
import { IsAcceptErrorStatusCode } from "@/lib/utils";
import { FormErrorResponse } from "@type/api.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { IUser } from "@type/user.type";
import {
    IUpdateUserInfoSchema,
    UpdateUserInfoSchema,
} from "@/schema/update-user.schema";

export default function ProfileSetting() {
    const queryClient = useQueryClient();
    const { user } = useUser();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        resetField,
        watch,
        formState: { errors },
    } = useForm<IUpdateUserInfoSchema>({
        resolver: zodResolver(UpdateUserInfoSchema),
        values: {
            displayName: user?.displayName || "",
            email: user?.email || "",
        },
    });

    const avatarFile = watch("avatar");

    const updateUserInfoMutation = useMutation({
        mutationFn: userApi.UpdateInfo,
        onSuccess: (response) => {
            queryClient.setQueryData(["user"], (old: IUser) => {
                return {
                    ...old,
                    displayName: response.displayName,
                    email: response.email,
                    changedEmail: response.changedEmail,
                };
            });
            reset();
            toast.success("Thông báo", {
                description: "Cập nhật thông tin thành công",
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError && IsAcceptErrorStatusCode(error)) {
                const formError: FormErrorResponse = error.response?.data;
                Object.keys(formError).forEach((key) => {
                    setError(key as keyof IUpdateUserInfoSchema, {
                        message:
                            formError[key as keyof IUpdateUserInfoSchema][0],
                    });
                });
            }
            reset({ email: user?.email, displayName: user?.displayName });
        },
    });

    const uploadAvatarMutation = useMutation({
        mutationFn: userApi.UploadAvatar,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], (old: IUser) => {
                return { ...old, avatar: data.avatar };
            });
        },
        onSettled: () => resetField("avatar"),
    });

    const isPendingApis =
        updateUserInfoMutation.isPending || uploadAvatarMutation.isPending;

    const onSubmit: SubmitHandler<IUpdateUserInfoSchema> = async (data) => {
        let uploadAvatarResponse;
        const { displayName, email } = data;

        if (avatarFile && avatarFile.length > 0) {
            const form = new FormData();
            form.append("avatar", avatarFile[0]);
            uploadAvatarMutation.mutate(form);
        }

        updateUserInfoMutation.mutate({
            displayName,
            email,
        });
    };

    return (
        <div className='flex flex-col flex-grow'>
            <div className='flex flex-col'>
                <h2 className='text-xl font-semibold'>Thông tin tài khoản</h2>
                <p className='text-muted-foreground'>
                    Chỉnh sửa thông tin tài khoản
                </p>
                <Separator className='my-4' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col mt-3 space-y-8'>
                    {/* Display Name */}
                    <div className='flex flex-col space-y-2 w-full'>
                        <Label
                            htmlFor='displayName'
                            className='font-medium text-sm'
                        >
                            Nhập tên hiển thị
                        </Label>
                        <Input
                            {...register("displayName")}
                            disabled={isPendingApis}
                            id='displayName'
                        />
                        <p
                            className={`${
                                errors.displayName
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            } text-[0.8rem]`}
                        >
                            {errors.displayName?.message ||
                                "Mọi người sẽ thấy tên này của bạn"}
                        </p>
                    </div>

                    {/* Email */}
                    <div className='flex flex-col space-y-2 w-full'>
                        <Label
                            htmlFor='email'
                            className='font-medium text-sm'
                        >
                            Email
                        </Label>
                        <Input
                            {...register("email")}
                            disabled={isPendingApis || user?.changedEmail}
                            id='email'
                        />
                        <p
                            className={`${
                                errors.email
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            } text-[0.8rem]`}
                        >
                            {errors.email?.message ||
                                "Mỗi tài khoản chỉ được thay đổi email một lần duy nhất"}
                        </p>
                    </div>

                    {/* Avatar */}
                    <div className='flex flex-col space-y-2 w-full'>
                        <Label htmlFor='avatar'>Ảnh đại diện</Label>
                        <Input
                            {...register("avatar")}
                            id='avatar'
                            type='file'
                            multiple={false}
                            accept='image/png, image/jpeg'
                            disabled={isPendingApis}
                        />
                        <p
                            className={`${
                                errors.avatar
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            } text-[0.8rem]`}
                        >
                            {errors.avatar?.message ||
                                "Ảnh đại diện phải có dung lượng < 2mb"}
                        </p>
                    </div>

                    <Button
                        disabled={isPendingApis}
                        className='w-64'
                        type='submit'
                    >
                        {isPendingApis && (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        )}
                        Cập nhật tài khoản
                    </Button>
                </div>
            </form>
        </div>
    );
}
