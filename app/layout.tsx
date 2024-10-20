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
  description:
    "Recipes with ratings and reviews by home cooks like you. Find easy dinner ideas, healthy recipes, plus helpful cooking tips and techniques.",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${InterFont.className} antialiased h-dvh pt-4`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
