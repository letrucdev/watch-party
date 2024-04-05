"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { userApi } from "@/lib/apis";
import { IsAcceptErrorStatusCode } from "@/lib/utils";
import { FormErrorResponse } from "@/types/api.type";
import { IUpdateUserInfoForm, UpdateUserInfoSchema } from "@api/schema/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfileSetting() {
    const queryClient = useQueryClient();

    const { data, isPending } = useQuery({
        queryKey: ["user"],
        staleTime: 30 * 60 * 1000,
        queryFn: userApi.Info,
    });

    const user = data?.user;

    const {
        register,
        handleSubmit,
        setError,
        reset,
        resetField,
        watch,
        formState: { errors },
    } = useForm<IUpdateUserInfoForm>({
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
            queryClient.setQueryData(["user"], response);
            toast.success("Thông báo", { description: response.message });
        },
        onError: (error) => {
            if (error instanceof AxiosError && IsAcceptErrorStatusCode(error)) {
                const formError: FormErrorResponse = error.response?.data;
                Object.keys(formError).forEach((key) => {
                    setError(key as keyof IUpdateUserInfoForm, {
                        message: formError[key as keyof IUpdateUserInfoForm][0],
                    });
                });
            }
            reset({ email: user?.email, displayName: user?.displayName });
        },
    });

    const uploadAvatarMutation = useMutation({
        mutationFn: userApi.UploadAvatar,
        onSuccess: () => resetField("avatar"),
    });

    const onSubmit: SubmitHandler<IUpdateUserInfoForm> = async (data) => {
        let uploadAvatarResponse;
        const { displayName, email } = data;

        if (avatarFile && avatarFile.length > 0) {
            const form = new FormData();
            form.append("avatar", avatarFile[0]);
            uploadAvatarResponse = await uploadAvatarMutation.mutateAsync(form);
        }

        updateUserInfoMutation.mutate({
            displayName,
            email,
            avatar: uploadAvatarResponse?.avatar,
        });
    };

    const isPendingApi =
        uploadAvatarMutation.isPending ||
        updateUserInfoMutation.isPending ||
        isPending;

    return (
        <div className="flex flex-col flex-grow">
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Thông tin tài khoản</h2>
                <p className="text-muted-foreground">
                    Chỉnh sửa thông tin tài khoản
                </p>
                <Separator className="my-4" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-3 space-y-8">
                    {/* Display Name */}
                    <div className="flex flex-col space-y-2 w-full">
                        <Label
                            htmlFor="displayName"
                            className="font-medium text-sm"
                        >
                            Nhập tên hiển thị
                        </Label>
                        <Input
                            {...register("displayName")}
                            disabled={isPendingApi}
                            id="displayName"
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
                    <div className="flex flex-col space-y-2 w-full">
                        <Label
                            htmlFor="email"
                            className="font-medium text-sm"
                        >
                            Email
                        </Label>
                        <Input
                            {...register("email")}
                            disabled={isPendingApi}
                            id="email"
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
                    <div className="flex flex-col space-y-2 w-full">
                        <Label htmlFor="avatar">Ảnh đại diện</Label>
                        <Input
                            {...register("avatar")}
                            id="avatar"
                            type="file"
                            accept="image/png, image/jpeg"
                            disabled={isPendingApi}
                        />
                        <p
                            className={`${
                                errors.avatar
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            } text-[0.8rem]`}
                        >
                            {errors.avatar?.message ||
                                "Ảnh đại diện phải có dung lượng < 5mb"}
                        </p>
                    </div>

                    <Button
                        disabled={isPendingApi}
                        className="w-64"
                        type="submit"
                    >
                        {isPendingApi && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Cập nhật tài khoản
                    </Button>
                </div>
            </form>
        </div>
    );
}
