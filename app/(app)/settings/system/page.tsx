"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { userApi } from "@/lib/apis";
import {
    IUpdateSystemSetting,
    UpdateSystemSettingSchema,
} from "@api/schema/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SystemSettingPage() {
    const { data, isPending } = useQuery({
        queryKey: ["user"],
        staleTime: 30 * 60 * 1000,
        queryFn: userApi.Info,
    });

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<IUpdateSystemSetting>({
        resolver: zodResolver(UpdateSystemSettingSchema),
    });

    const user = data?.user;

    useEffect(() => {
        if (user) {
            reset({
                animationEnable: Boolean(user.setting.animationEnable),
                ecoMode: Boolean(user.setting.ecoMode),
            });
        }
    }, [reset, user]);

    const onSubmit: SubmitHandler<IUpdateSystemSetting> = (data) =>
        console.log(data);

    return (
        <div className="flex flex-col flex-grow">
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Hệ thống</h2>
                <p className="text-muted-foreground">
                    Cài đặt chung cho trang web
                </p>
                <Separator className="my-4" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mt-3 space-y-8">
                        <div className="flex flex-col space-y-2 w-full">
                            <Label
                                htmlFor="oldPassword"
                                className="font-medium text-sm"
                            >
                                Hiệu suất
                            </Label>
                            <div className=" flex items-center space-x-4 rounded-md border p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Hoạt ảnh
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Bật hoạt ảnh sẽ làm giảm hiệu năng của
                                        trang web
                                    </p>
                                </div>
                                <Switch
                                    disabled={isPending}
                                    {...register("animationEnable")}
                                />
                            </div>

                            <div className=" flex items-center space-x-4 rounded-md border p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Chế độ cấu hình thấp
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Chế độ dành cho thiết bị cấu hình thấp,
                                        chỉ bật khi thực sự cần!
                                    </p>
                                </div>
                                <Switch
                                    disabled={isPending}
                                    {...register("ecoMode")}
                                />
                            </div>
                        </div>

                        <Button className="w-64">Cập nhật thay đổi</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
