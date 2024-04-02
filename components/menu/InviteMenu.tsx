"use client";

import { Clipboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InviteMenu() {
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
                    defaultValue={window.location.href}
                />
                <Button
                    type="button"
                    variant={"secondary"}
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
