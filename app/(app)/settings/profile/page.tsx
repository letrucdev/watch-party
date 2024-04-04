"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { userApi } from "@/lib/apis";
import { IsAcceptErrorStatusCode } from "@/lib/utils";
import { FormErrorResponse } from "@/types/api.type";
import { IUser } from "@/types/user.type";
import { IUpdateUserInfo, UpdateUserInfoSchema } from "@api/schema/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
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
        setValue,
        setError,
        reset,
        formState: { errors },
    } = useForm<IUpdateUserInfo>({
        resolver: zodResolver(UpdateUserInfoSchema),
    });

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
                    setError(key as keyof IUpdateUserInfo, {
                        message: formError[key as keyof IUpdateUserInfo][0],
                    });
                });
            }
            reset({ email: user?.email, displayName: user?.displayName });
        },
    });

    const onSubmit: SubmitHandler<IUpdateUserInfo> = (data) =>
        updateUserInfoMutation.mutate(data);

    useEffect(() => {
        if (user) {
            setValue("displayName", user.displayName);
            setValue("email", user.email);
        }
    }, [user, setValue]);

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
                            disabled={isPending}
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
                            disabled={isPending}
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
                    {/*     <div className="flex flex-col space-y-2 w-full">
                        <Label htmlFor="avatar">Ảnh đại diện</Label>
                        <Input
                            id="avatar"
                            type="file"
                        />
                        <p className="text-muted-foreground text-[0.8rem]">
                            {`Ảnh đại diện phải có dung lượng < 10mb`}
                        </p>
                    </div> */}

                    <Button
                        disabled={isPending || updateUserInfoMutation.isPending}
                        className="w-64"
                        type="submit"
                    >
                        {updateUserInfoMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Cập nhật tài khoản
                    </Button>
                </div>
            </form>
        </div>
    );
}
