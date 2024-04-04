import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header/Header";
import QueryProviders from "@/app/query-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
/* import { AuthProvider } from "@/context/AuthContext"; */
/* import { CookiesKeys } from "@/lib/constants"; */

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
    const cookieStore = cookies();
    /*   const acessTokenFromCookies = cookieStore.get(
        CookiesKeys.accessToken
    )?.value; */
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
                        <div className={"min-h-screen"}>
                            <Header />
                            <div className="container p-4">{children}</div>
                        </div>
                    </QueryProviders>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
