"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Download } from "lucide-react"

export default function StudentPayments() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const payments = [
    {
      id: "1",
      amount: 500000,
      date: "1403/09/01",
      status: "completed",
      description: "شهریه ماهانه مشاوره - مهر ماه",
    },
    {
      id: "2",
      amount: 500000,
      date: "1403/08/01",
      status: "completed",
      description: "شهریه ماهانه مشاوره - شهریور ماه",
    },
    {
      id: "3",
      amount: 500000,
      date: "1403/10/01",
      status: "pending",
      description: "شهریه ماهانه مشاوره - آبان ماه",
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">پرداخت هزینه مشاوره</h1>
          <p className="text-muted-foreground">مدیریت و پرداخت شهریه ماهانه</p>
        </div>

        <Card className="bg-gradient-to-l from-primary/10 to-accent/10 mb-6">
          <CardHeader>
            <CardTitle>شهریه ماهانه</CardTitle>
            <CardDescription>پرداخت شهریه ماه جاری</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">500,000 تومان</p>
                <p className="text-sm text-muted-foreground mt-1">سررسید: 1403/10/01</p>
              </div>
              <Button>
                <CreditCard className="h-4 w-4 ml-2" />
                پرداخت آنلاین
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-bold mb-4">تاریخچه پرداخت‌ها</h2>
          <div className="space-y-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{payment.description}</CardTitle>
                    <div
                      className={`text-xs px-3 py-1 rounded-full ${
                        payment.status === "completed" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                      }`}
                    >
                      {payment.status === "completed" ? "پرداخت شده" : "در انتظار پرداخت"}
                    </div>
                  </div>
                  <CardDescription>{payment.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{payment.amount.toLocaleString("fa-IR")} تومان</p>
                    {payment.status === "completed" ? (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        دانلود رسید
                      </Button>
                    ) : (
                      <Button size="sm">پرداخت</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
