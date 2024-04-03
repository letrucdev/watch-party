"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";

export default function SystemSettingPage() {
    const { authUser } = useAuth();
    return (
        <div className="flex flex-col flex-grow">
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Hệ thống</h2>
                <p className="text-muted-foreground">
                    Cài đặt chung cho trang web
                </p>
                <Separator className="my-4" />

                <form action="#!">
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
                                    defaultChecked={Boolean(
                                        authUser?.setting.animationEnable
                                    )}
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
                                    defaultChecked={Boolean(
                                        authUser?.setting.ecoMode
                                    )}
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
