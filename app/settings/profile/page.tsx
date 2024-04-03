"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export default function ProfileSetting() {
    const { authUser } = useAuth();
    return (
        <div className="flex flex-col flex-grow">
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Thông tin tài khoản</h2>
                <p className="text-muted-foreground">
                    Chỉnh sửa thông tin tài khoản
                </p>
                <Separator className="my-4" />
            </div>
            <form action="#!">
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
                            defaultValue={authUser?.displayName}
                            id="displayName"
                            placeholder="Tên của bạn"
                        />
                        <p className="text-muted-foreground text-[0.8rem]">
                            Mọi người sẽ thấy tên này của bạn
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
                            defaultValue={authUser?.email}
                            id="email"
                            placeholder="Nhập email của bạn"
                        />
                        <p className="text-muted-foreground text-[0.8rem]">
                            Mỗi tài khoản chỉ được thay đổi email một lần duy
                            nhất
                        </p>
                    </div>

                    {/* Avatar */}
                    <div className="flex flex-col space-y-2 w-full">
                        <Label htmlFor="avatar">Ảnh đại diện</Label>
                        <Input
                            id="avatar"
                            type="file"
                        />
                        <p className="text-muted-foreground text-[0.8rem]">
                            {`Ảnh đại diện phải có dung lượng < 10mb`}
                        </p>
                    </div>

                    <Button className="w-64">Cập nhật tài khoản</Button>
                </div>
            </form>
        </div>
    );
}
