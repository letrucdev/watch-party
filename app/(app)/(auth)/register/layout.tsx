import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Đăng ký",
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
