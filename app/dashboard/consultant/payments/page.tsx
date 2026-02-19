"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CreditCard, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConsultantPayments() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "consultant")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const payments = [
    {
      id: "1",
      student: "علی محمدی",
      amount: 500000,
      date: "1403/09/01",
      status: "completed",
      description: "شهریه ماهانه مشاوره - مهر ماه",
    },
    {
      id: "2",
      student: "سارا احمدی",
      amount: 500000,
      date: "1403/09/01",
      status: "completed",
      description: "شهریه ماهانه مشاوره - مهر ماه",
    },
    {
      id: "3",
      student: "محمد رضایی",
      amount: 500000,
      date: "1403/09/01",
      status: "completed",
      description: "شهریه ماهانه مشاوره - مهر ماه",
    },
    {
      id: "4",
      student: "علی محمدی",
      amount: 500000,
      date: "1403/10/01",
      status: "pending",
      description: "شهریه ماهانه مشاوره - آبان ماه",
    },
  ]

  const totalIncome = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const thisMonthIncome = payments
    .filter((p) => p.status === "completed" && p.date.startsWith("1403/09"))
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">پرداخت‌های دانش‌آموزان</h1>
          <p className="text-muted-foreground">مشاهده و مدیریت پرداخت‌های دریافتی</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">درآمد کل</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalIncome.toLocaleString("fa-IR")}</div>
              <p className="text-xs text-muted-foreground mt-1">تومان</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">درآمد این ماه</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{thisMonthIncome.toLocaleString("fa-IR")}</div>
              <p className="text-xs text-muted-foreground mt-1">تومان</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">تاریخچه پرداخت‌ها</h2>
          <div className="space-y-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{payment.student}</CardTitle>
                      <CardDescription>{payment.description}</CardDescription>
                    </div>
                    <div
                      className={`text-xs px-3 py-1 rounded-full ${
                        payment.status === "completed" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                      }`}
                    >
                      {payment.status === "completed" ? "پرداخت شده" : "در انتظار پرداخت"}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{payment.amount.toLocaleString("fa-IR")} تومان</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
