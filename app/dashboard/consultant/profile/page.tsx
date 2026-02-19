"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ConsultantProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "consultant")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "consultant") {
    return null
  }

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">پروفایل مشاور</h1>
        <p className="text-muted-foreground mt-2">مشاهده و ویرایش اطلاعات شخصی</p>
      </div>

      <div className="space-y-6">
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
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>اطلاعات تخصصی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="specialization">تخصص‌ها</Label>
              <Input id="specialization" placeholder="ریاضی، فیزیک" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">درباره من</Label>
              <Textarea id="bio" placeholder="معرفی کوتاه از خود..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">سابقه فعالیت (سال)</Label>
              <Input id="experience" type="number" placeholder="5" />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full sm:w-auto">ذخیره تغییرات</Button>
      </div>
    </main>
  )
}
