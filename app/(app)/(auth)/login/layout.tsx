import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Đăng nhập tài khoản",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
