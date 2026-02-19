import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart-context"
import { Footer } from "@/components/footer"
import "./globals.css"

const vazirmatn = Vazirmatn({ subsets: ["arabic"] })

export const metadata: Metadata = {
  title: "مشاوره تحصیلی | سامانه مشاوره و برنامه‌ریزی درسی",
  description: "سامانه جامع مشاوره تحصیلی برای دانش‌آموزان و مشاوران",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
