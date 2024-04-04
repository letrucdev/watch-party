import { Separator } from "@/components/ui/separator";
import { SettingNavigation } from "@/components/settings/SettingNavigation";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Cài đặt</h2>
                <p className="text-muted-foreground">
                    Cài đặt tài khoản và hệ thống
                </p>
                <Separator className="my-4" />
            </div>
            <div className="flex mt-2 space-x-12">
                <SettingNavigation />
                {children}
            </div>
        </div>
    );
}
