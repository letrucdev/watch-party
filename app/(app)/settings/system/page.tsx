"use client";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel,} from "@components/ui/form";
import {Button} from "@components/ui/button";
import {Label} from "@components/ui/label";
import {Separator} from "@components/ui/separator";
import {Switch} from "@components/ui/switch";
import {userApi} from "@lib/apis";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUser, IUserSetting} from "@type/user.type";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {useUser} from "@/hooks/useUser";
import {IUpdateUserSystemSettingSchema, UpdateUserSystemSettingSchema} from "@/schema/update-user.schema";

export default function SystemSettingPage() {
    const queryClient = useQueryClient();

    const {user} = useUser();

    const form = useForm<IUpdateUserSystemSettingSchema>({
        resolver: zodResolver(UpdateUserSystemSettingSchema),
        values: {
            animationEnable: Boolean(user?.setting.animationEnable),
            ecoMode: Boolean(user?.setting.ecoMode),
        },
    });

    const changeSystemSettingMutation = useMutation({
        mutationFn: (data: IUserSetting) => {
            return userApi.ChangeSystemSetting(data);
        },
        onSuccess: (data) => {
            toast.success("Thông báo", {description: "Thay đổi cài đặt thành công"});
            queryClient.setQueryData(["user"], (old: IUser) => {
                return {
                    ...old,
                    setting: data
                };
            });
        },
    });

    const onSubmit: SubmitHandler<IUpdateUserSystemSettingSchema> = (data) =>
        changeSystemSettingMutation.mutate(data);

    return (
        <div className="flex flex-col flex-grow">
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Hệ thống</h2>
                <p className="text-muted-foreground">
                    Cài đặt chung cho trang web
                </p>
                <Separator className="my-4"/>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col mt-3 space-y-8">
                            <div className="flex flex-col space-y-2 w-full">
                                <Label className="font-medium text-sm">
                                    Hiệu suất
                                </Label>

                                <FormField
                                    control={form.control}
                                    name="animationEnable"
                                    render={({field}) => (
                                        <FormItem className=" flex items-center space-x-4 rounded-md border p-4">
                                            <div className="flex-1 space-y-1">
                                                <FormLabel>Hoạt ảnh</FormLabel>
                                                <FormDescription>
                                                    Bật hoạt ảnh sẽ làm giảm
                                                    hiệu năng của trang web
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={changeSystemSettingMutation.isPending}
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="ecoMode"
                                    render={({field}) => (
                                        <FormItem className=" flex items-center space-x-4 rounded-md border p-4">
                                            <div className="flex-1 space-y-1">
                                                <FormLabel>
                                                    Chế độ cấu hình thấp
                                                </FormLabel>
                                                <FormDescription>
                                                    Chế độ dành cho thiết bị cấu
                                                    hình thấp, chỉ bật khi thực
                                                    sự cần!
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={changeSystemSettingMutation.isPending}
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                className="w-64"
                                disabled={
                                    changeSystemSettingMutation.isPending
                                }
                            >
                                {changeSystemSettingMutation.isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                )}
                                Cập nhật thay đổi
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
