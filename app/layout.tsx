import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import ChatInterface from "./components/ChatInterface"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FitTrack Pro",
  description: "Your personal fitness companion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-background to-primary-50/30 px-4 py-6">
              {children}
            </main>
          </div>
        </div>
        <ChatInterface />
      </body>
    </html>
  )
}
