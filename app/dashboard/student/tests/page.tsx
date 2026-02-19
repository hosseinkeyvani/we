"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BookOpen, ExternalLink } from "lucide-react"

export default function StudentTests() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">تست‌های آزمون</h1>
        <p className="text-muted-foreground">تست‌های روانشناسی و درسی</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>تست‌های روانشناسی</CardTitle>
                <CardDescription>ای سنج - ارزیابی شخصیت</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              با استفاده از سامانه ای سنج، تست‌های روانشناسی خود را انجام دهید و استعدادها و علایق خود را کشف کنید.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">تست هوش چندگانه</span>
                <Button size="sm" variant="outline">
                  شروع تست
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">تست شخصیت‌شناسی</span>
                <Button size="sm" variant="outline">
                  شروع تست
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">تست علایق شغلی</span>
                <Button size="sm" variant="outline">
                  شروع تست
                </Button>
              </div>
            </div>

            <Button className="w-full" variant="secondary">
              <ExternalLink className="h-4 w-4 ml-2" />
              ورود به ای سنج
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle>تست‌های درسی</CardTitle>
                <CardDescription>سایت منتا - آزمون‌های تستی</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              با استفاده از سامانه منتا، تست‌های درسی خود را انجام دهید و عملکرد درسی خود را بسنجید.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">آزمون ریاضی</span>
                <Button size="sm" variant="outline">
                  شروع آزمون
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">آزمون فیزیک</span>
                <Button size="sm" variant="outline">
                  شروع آزمون
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">آزمون شیمی</span>
                <Button size="sm" variant="outline">
                  شروع آزمون
                </Button>
              </div>
            </div>

            <Button className="w-full" variant="secondary">
              <ExternalLink className="h-4 w-4 ml-2" />
              ورود به سایت منتا
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>نتایج آزمون‌های قبلی</CardTitle>
          <CardDescription>عملکرد و نمرات آزمون‌های انجام شده</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">آزمون ریاضی - فصل 3</p>
                <p className="text-sm text-muted-foreground">1403/09/20</p>
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-primary">85%</p>
                <p className="text-xs text-muted-foreground">17 از 20</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">آزمون فیزیک - الکتریسیته</p>
                <p className="text-sm text-muted-foreground">1403/09/15</p>
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-accent">90%</p>
                <p className="text-xs text-muted-foreground">18 از 20</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
