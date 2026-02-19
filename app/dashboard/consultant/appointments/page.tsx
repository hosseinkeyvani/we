"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

export default function ConsultantAppointments() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "consultant")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const appointments = [
    {
      id: "1",
      student: "علی محمدی",
      date: "1403/10/10",
      time: "14:00",
      topic: "بررسی نتایج آزمون",
      status: "confirmed",
    },
    {
      id: "2",
      student: "سارا احمدی",
      date: "1403/10/12",
      time: "16:00",
      topic: "برنامه‌ریزی هفته آینده",
      status: "pending",
    },
    {
      id: "3",
      student: "محمد رضایی",
      date: "1403/10/08",
      time: "10:00",
      topic: "مشاوره انتخاب رشته",
      status: "completed",
    },
  ]

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: "در انتظار",
      confirmed: "تایید شده",
      completed: "انجام شده",
      cancelled: "لغو شده",
    }
    return labels[status as keyof typeof labels] || status
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    const variants = {
      pending: "secondary" as const,
      confirmed: "default" as const,
      completed: "outline" as const,
      cancelled: "destructive" as const,
    }
    return variants[status as keyof typeof variants] || "default"
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">لیست نوبت‌های مشاوره</h1>
        <p className="text-muted-foreground mt-2">مشاهده و مدیریت جلسات مشاوره</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">در انتظار تایید</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {appointments.filter((a) => a.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">تایید شده</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {appointments.filter((a) => a.status === "confirmed").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">انجام شده</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">
              {appointments.filter((a) => a.status === "completed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">جلسات آینده</h2>
        {appointments
          .filter((a) => a.status !== "completed" && a.status !== "cancelled")
          .map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{appointment.topic}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{appointment.student}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(appointment.status)}>{getStatusLabel(appointment.status)}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">جلسات انجام شده</h2>
        {appointments
          .filter((a) => a.status === "completed")
          .map((appointment) => (
            <Card key={appointment.id} className="opacity-60">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{appointment.topic}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{appointment.student}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(appointment.status)}>{getStatusLabel(appointment.status)}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
      </div>
    </main>
  )
}
