import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"

const InterFont = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const generateMetadata = (): Metadata => ({
  title: { template: "%s | Recipe", default: "Recipe" },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${InterFont.className} antialiased h-dvh mt-4`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
