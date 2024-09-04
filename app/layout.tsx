import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { ThemeProvider } from "next-themes"

import { siteConfig } from "@/config/site"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

export const inter = Inter({ subsets: ["latin"] })
export const calSans = localFont({ src: "../fonts/CalSans-SemiBold.ttf" })

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [
    {
      name: "nainglinnkhant",
      url: "https://nainglinnkhant.com",
    },
  ],
  metadataBase: new URL(siteConfig.url),
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
      },
    ],
    creator: "@nainglk",
  },
  openGraph: {
    type: "website",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    url: siteConfig.url,
    locale: "en_US",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
      },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster richColors />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  )
}
