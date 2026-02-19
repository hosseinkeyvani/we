import type React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <DashboardNav />
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
