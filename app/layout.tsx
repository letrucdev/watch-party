import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header/Header";
import QueryProviders from "@/app/query-provider";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Watch Party",
    description: "Watch Party code by letrucdev",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className={`${inter.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <QueryProviders>
                        <AuthProvider>
                            <div className={"min-h-screen"}>
                                <Header />
                                <div className="container p-4">{children}</div>
                            </div>
                        </AuthProvider>
                    </QueryProviders>
                </ThemeProvider>
            </body>
        </html>
    );
}
