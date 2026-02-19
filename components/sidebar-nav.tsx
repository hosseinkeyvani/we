"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Home, Phone, Briefcase, Info, ShoppingCart, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"

export function SidebarNav() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (isLoggedIn) {
      router.push("/cart")
    } else {
      router.push("/auth")
    }
  }

  const navItems = [
    { href: "/", label: "صفحه اصلی", icon: Home },
    { href: "/services", label: "خدمات", icon: Briefcase },
    { href: "/about", label: "درباره ما", icon: Info },
    { href: "/contact", label: "تماس با ما", icon: Phone },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="bg-transparent">
          <Menu className="h-5 w-5" />
          <span className="sr-only">منوی ناوبری</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px]">
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-lg">{item.label}</span>
            </Link>
          ))}

          {isLoggedIn && (
            <Link
              href="/my-courses"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              <span className="text-lg">دوره‌های من</span>
            </Link>
          )}

          <button
            onClick={handleCartClick}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-right w-full"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </div>
            <span className="text-lg">سبد خرید</span>
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
