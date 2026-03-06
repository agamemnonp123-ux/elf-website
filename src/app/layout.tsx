import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "elf Events — Luxury Wedding & Event Planning",
    description: "elf Events crafts unforgettable weddings and luxury events. Full planning, design, and day-of coordination services.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
