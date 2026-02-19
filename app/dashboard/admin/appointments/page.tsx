"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockAppointments } from "@/lib/mock-data"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminAppointmentsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [appointments, setAppointments] = useState(mockAppointments)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "admin") {
    return null
  }

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
    <div className="min-h-screen bg-background">
      {/* DashboardNav has been removed as it's in layout */}

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">لیست نوبت‌های مشاوره</h1>
          <p className="text-muted-foreground mt-2">مشاهده تمام نوبت‌های سیستم</p>
        </div>

        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>نوبت مشاوره</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{appointment.notes}</p>
                  </div>
                  <Badge variant={getStatusVariant(appointment.status)}>{getStatusLabel(appointment.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
