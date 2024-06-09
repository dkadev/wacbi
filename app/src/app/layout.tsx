import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

import MainMenu from "@/components/MainMenu"

export const metadata: Metadata = {
    title: "Wacbi",
    description: "WhatsApp Chat Backup Inspector",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <header>
                    <div className="hidden flex-col md:flex">
                        <div className="border-b">
                            <div className="container flex h-16 items-center place-content-between px-4">
                                <MainMenu />
                            </div>
                        </div>
                    </div>
                </header>
                <main>{children}</main>
            </body>
        </html>
    )
}
