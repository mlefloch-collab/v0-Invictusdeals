import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { AIAssistant } from "@/components/ai-assistant"

export const metadata: Metadata = {
  title: "DealFlow - Investment Management Platform",
  description: "Professional dealflow management software for investment professionals",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="dealflow-theme">
          <div className="min-h-screen bg-background">
            <Navigation />
            <div
              className="transition-all duration-300 ease-in-out"
              style={{ marginLeft: "var(--sidebar-width, 264px)" }}
            >
              {children}
            </div>
            <AIAssistant />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
