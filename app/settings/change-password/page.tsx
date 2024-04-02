import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ChangePassword() {
    return (
        <div className="flex flex-col flex-grow">
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Đổi mật khẩu</h2>
                <p className="text-muted-foreground">
                    Đổi mật khẩu cho tài khoản
                </p>
                <Separator className="my-4" />
            </div>
            <form action="#!">
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
                            id="oldPassword"
                            type="password"
                        />
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
                            id="newPassword"
                            type="password"
                        />
                        <p className="text-muted-foreground text-[0.8rem]">
                            Mật khẩu cần tối thiểu 6 - 100 ký tự và khác mật
                            khẩu cũ để đảm bảo độ bảo mật cho tài khoản
                        </p>
                    </div>

                    {/* Confirm new password */}
                    <div className="flex flex-col space-y-2 w-full">
                        <Label htmlFor="confirmNewPassword">
                            Nhập lại mật khẩu mới
                        </Label>
                        <Input
                            id="confirmNewPassword"
                            type="password"
                        />
                        <p className="text-muted-foreground text-[0.8rem]">
                            {`Nhập lại chính xác mật khẩu mới của bạn`}
                        </p>
                    </div>

                    <Button className="w-64">Đổi mật khẩu</Button>
                </div>
            </form>
        </div>
    );
}
