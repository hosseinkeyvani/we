"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CreditCard, BookOpen, FileText } from "lucide-react"

export default function StudentDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
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
        <div>
          <h1 className="text-3xl font-bold mb-2">داشبورد دانش‌آموز</h1>
          <p className="text-muted-foreground">مدیریت جلسات، برنامه درسی و تکالیف خود</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">جلسات این هفته</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">جلسه مشاوره</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">تکالیف در انتظار</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">تکلیف باقی‌مانده</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">ساعات مطالعه</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">این هفته</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">آخرین پرداخت</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">پرداخت شده</div>
              <p className="text-xs text-muted-foreground">1403/09/15</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>جلسات پیش رو</CardTitle>
              <CardDescription>جلسات مشاوره برنامه‌ریزی شده</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">مشاوره برنامه‌ریزی درسی</p>
                    <p className="text-sm text-muted-foreground">1403/10/05 - ساعت 14:00</p>
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">تایید شده</div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">بررسی پیشرفت درسی</p>
                    <p className="text-sm text-muted-foreground">1403/10/08 - ساعت 16:00</p>
                  </div>
                  <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">در انتظار</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>برنامه امروز</CardTitle>
              <CardDescription>وظایف و برنامه‌های درسی</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">ریاضی - فصل 3</p>
                    <p className="text-xs text-muted-foreground">08:00 - 10:00</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">فیزیک - حل تمرین</p>
                    <p className="text-xs text-muted-foreground">10:30 - 12:00</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-chart-3" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">شیمی - مرور مباحث</p>
                    <p className="text-xs text-muted-foreground">14:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
