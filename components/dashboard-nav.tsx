"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  CreditCard,
  FileText,
  BookOpen,
  Brain,
  User,
  Video,
  LayoutDashboard,
  Newspaper,
  GraduationCap,
  Package,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  const adminLinks = [
    { href: "/dashboard/admin", label: "داشبورد", icon: LayoutDashboard },
    { href: "/dashboard/admin/news", label: "مدیریت اخبار", icon: Newspaper },
    { href: "/dashboard/admin/consultants", label: "مدیریت مشاوران", icon: GraduationCap },
    { href: "/dashboard/admin/plans", label: "مدیریت طرح‌ها", icon: Package },
    { href: "/dashboard/admin/videos", label: "مدیریت ویدئوها", icon: Video },
    { href: "/dashboard/admin/students", label: "لیست دانش‌آموزان", icon: Users },
    { href: "/dashboard/admin/appointments", label: "لیست نوبت‌ها", icon: Calendar },
    { href: "/dashboard/admin/profile", label: "پروفایل", icon: User },
  ]

  const studentLinks = [
    { href: "/dashboard/student", label: "داشبورد", icon: LayoutDashboard },
    { href: "/dashboard/student/appointments", label: "نوبت‌دهی", icon: Calendar },
    { href: "/dashboard/student/payments", label: "پرداخت‌ها", icon: CreditCard },
    { href: "/dashboard/student/schedule", label: "برنامه هفتگی", icon: BookOpen },
    { href: "/dashboard/student/tests", label: "تست‌ها", icon: Brain },
    { href: "/dashboard/student/assignments", label: "تکالیف", icon: FileText },
    { href: "/courses", label: "مشاهده دوره‌ها", icon: Video },
    { href: "/dashboard/student/profile", label: "پروفایل", icon: User },
  ]

  const consultantLinks = [
    { href: "/dashboard/consultant", label: "داشبورد", icon: LayoutDashboard },
    { href: "/dashboard/consultant/students", label: "لیست دانش‌آموزان", icon: Users },
    { href: "/dashboard/consultant/assignments", label: "ارسال تکلیف و برنامه", icon: FileText },
    { href: "/dashboard/consultant/appointments", label: "لیست نوبت‌ها", icon: Calendar },
    { href: "/dashboard/consultant/profile", label: "پروفایل", icon: User },
  ]

  const links = user?.role === "admin" ? adminLinks : user?.role === "student" ? studentLinks : consultantLinks

  return (
    <nav className="container mx-auto px-4 py-3">
      <div className="flex items-center gap-2 overflow-x-auto">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
