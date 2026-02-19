"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Removed DashboardNav import as it's in layout */}
      {/* Removed DashboardNav component as it's in layout */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">پروفایل مدیر</h1>
          <p className="text-muted-foreground mt-2">مشاهده و ویرایش اطلاعات شخصی</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>اطلاعات شخصی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">نام</Label>
                <Input id="firstName" defaultValue={user.firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">نام خانوادگی</Label>
                <Input id="lastName" defaultValue={user.lastName} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">نام کاربری</Label>
              <Input id="username" defaultValue={user.username} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">شماره تلفن</Label>
              <Input id="phone" defaultValue={user.phone} />
            </div>
            <Button className="w-full sm:w-auto">ذخیره تغییرات</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
