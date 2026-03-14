import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/store/providers";

export const metadata: Metadata = {
    title: "FlowIMS - Inventory Management System",
    description: "Manage your inventory with precision and ease.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
