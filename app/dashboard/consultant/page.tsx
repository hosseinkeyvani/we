"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, FileText, CreditCard } from "lucide-react"

export default function ConsultantDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "consultant")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>در حال بارگذاری...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">داشبورد مشاور</h1>
          <p className="text-muted-foreground">مدیریت دانش‌آموزان و برنامه‌های مشاوره</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">دانش‌آموزان فعال</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">دانش‌آموز</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">جلسات این هفته</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">جلسه مشاوره</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">تکالیف ارسالی</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">در انتظار بررسی</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">درآمد این ماه</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6,000,000</div>
              <p className="text-xs text-muted-foreground">تومان</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>جلسات امروز</CardTitle>
              <CardDescription>جلسات مشاوره برنامه‌ریزی شده</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">علی محمدی</p>
                    <p className="text-sm text-muted-foreground">ساعت 14:00 - مشاوره برنامه‌ریزی</p>
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">تایید شده</div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">سارا احمدی</p>
                    <p className="text-sm text-muted-foreground">ساعت 16:00 - بررسی پیشرفت</p>
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">تایید شده</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تکالیف اخیر</CardTitle>
              <CardDescription>تکالیف ارسال شده توسط دانش‌آموزان</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">تمرین ریاضی - فصل 3</p>
                    <p className="text-sm text-muted-foreground">علی محمدی - 1403/10/01</p>
                  </div>
                  <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">جدید</div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">گزارش آزمایش فیزیک</p>
                    <p className="text-sm text-muted-foreground">سارا احمدی - 1403/09/30</p>
                  </div>
                  <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">جدید</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
