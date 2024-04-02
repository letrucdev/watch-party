"use client";
import { routePath } from "@/constants/path";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const SettingNavigation = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-64">
            <Button
                asChild
                variant={
                    pathname === routePath.settingProfile ? "secondary" : "link"
                }
                className="justify-start"
            >
                <Link href={routePath.settingProfile}>Tài khoản</Link>
            </Button>
            <Button
                asChild
                variant={
                    pathname === routePath.changePassword ? "secondary" : "link"
                }
                className="justify-start"
            >
                <Link href={routePath.changePassword}>Đổi mật khẩu</Link>
            </Button>
            <Button
                asChild
                variant={
                    pathname === routePath.settingSystem ? "secondary" : "link"
                }
                className="justify-start"
            >
                <Link href={routePath.settingSystem}>Hệ thống</Link>
            </Button>
        </div>
    );
};
