"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { SidebarNav } from "@/components/sidebar-nav"
import { BookOpen, User } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex-shrink-0">
          <SidebarNav />
        </div>

        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">مشاوره تحصیلی</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href={user.role === "student" ? "/dashboard/student" : "/dashboard/consultant"}>
                  <User className="h-4 w-4 ml-2" />
                  {user.name}
                </Link>
              </Button>
              <Button onClick={logout} variant="outline" size="sm">
                خروج
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth">ورود / ثبت نام</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
