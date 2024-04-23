import type {Metadata} from "next";
import React from "react";
import {Inter} from "next/font/google";
import {ThemeProvider} from "@components/theme-provider";
import {Header} from "@components/header/Header";
import {Toaster} from "@components/ui/sonner";
import ProgressBarProviders from "@app/progress-bar-provider";
import QueryProviders from "@app/query-provider";
import {RoomProvider} from "@/context/RoomContext";
import "./globals.css";
import {AuthProvider} from "@/context/AuthContext";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        template: "%s | Watch Party",
        default: "Watch Party", // a default is required when creating a template
    },
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
                <ProgressBarProviders>
                    <AuthProvider>
                        <RoomProvider>
                            <div className={"min-h-screen"}>
                                <Header/>
                                <div className="container p-4">
                                    {children}
                                </div>
                                <Toaster/>
                            </div>
                        </RoomProvider>
                    </AuthProvider>
                </ProgressBarProviders>
            </QueryProviders>
        </ThemeProvider>
        </body>
        </html>
    );
}
