"use client";

import { Clipboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function InviteMenu() {
    const [inviteLink, setInviteLink] = useState<string>("");

    useEffect(() => {
        if (typeof window !== undefined) {
            setInviteLink(window.location.href);
        }
    }, []);

    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(inviteLink);
        toast.info("Thông báo", { description: "Sao chép link vào clipboard" });
    };

    return (
        <div className="rounded-xl border-border border flex flex-col">
            <span className="border-b border-border p-4 flex justify-between items-center">
                <p className="font-semibold">Mời tham gia</p>
            </span>
            <div className="flex w-full items-center space-x-2 p-2">
                <Input
                    className="focus-visible:ring-transparent"
                    type="url"
                    placeholder="Đường dẫn phòng"
                    readOnly
                    defaultValue={inviteLink}
                />
                <Button
                    type="button"
                    variant={"secondary"}
                    onClick={handleCopyInviteLink}
                >
                    <Clipboard
                        size={16}
                        className="mr-2"
                    />
                    Sao chép
                </Button>
            </div>
        </div>
    );
}
