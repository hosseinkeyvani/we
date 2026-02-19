"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"

export default function StudentAppointments() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const appointments = [
    {
      id: "1",
      date: "1403/10/05",
      time: "14:00",
      consultant: "دکتر احمدی",
      status: "confirmed",
      notes: "مشاوره برنامه‌ریزی درسی",
      scheduledBy: "دکتر احمدی",
      scheduledDate: "1403/09/28",
      topic: "برنامه‌ریزی درسی برای کنکور سراسری",
    },
    {
      id: "2",
      date: "1403/10/08",
      time: "16:00",
      consultant: "دکتر محمدی",
      status: "pending",
      notes: "بررسی پیشرفت تحصیلی",
      scheduledBy: "دکتر محمدی",
      scheduledDate: "1403/10/01",
      topic: "ارزیابی عملکرد تحصیلی و بررسی نقاط ضعف",
    },
  ]

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment)
    setDetailsOpen(true)
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">نوبت‌دهی آنلاین</h1>
          <p className="text-muted-foreground">مدیریت و رزرو جلسات مشاوره</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Calendar className="h-4 w-4 ml-2" />
              رزرو جلسه جدید
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>رزرو جلسه مشاوره</DialogTitle>
              <DialogDescription>اطلاعات جلسه مشاوره خود را وارد کنید</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">تاریخ</Label>
                <Input id="date" type="text" placeholder="1403/10/10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">ساعت</Label>
                <Input id="time" type="time" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">توضیحات</Label>
                <Textarea id="notes" placeholder="موضوع جلسه مشاوره..." />
              </div>

              <Button type="submit" className="w-full">
                ثبت درخواست
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{appointment.consultant}</CardTitle>
                <div
                  className={`text-xs px-3 py-1 rounded-full ${
                    appointment.status === "confirmed" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                  }`}
                >
                  {appointment.status === "confirmed" ? "تایید شده" : "در انتظار تایید"}
                </div>
              </div>
              <CardDescription>
                {appointment.date} - ساعت {appointment.time}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{appointment.notes}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(appointment)}>
                  جزئیات
                </Button>
                {appointment.status === "pending" && (
                  <Button variant="destructive" size="sm">
                    لغو جلسه
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>جزئیات جلسه مشاوره</DialogTitle>
            <DialogDescription>اطلاعات کامل نوبت</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="font-semibold">مشاور:</Label>
                <p className="text-sm">{selectedAppointment.consultant}</p>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">تاریخ و ساعت جلسه:</Label>
                <p className="text-sm">
                  {selectedAppointment.date} - ساعت {selectedAppointment.time}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">تنظیم شده توسط:</Label>
                <p className="text-sm">{selectedAppointment.scheduledBy}</p>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">تاریخ تنظیم نوبت:</Label>
                <p className="text-sm">{selectedAppointment.scheduledDate}</p>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">موضوع جلسه:</Label>
                <p className="text-sm">{selectedAppointment.topic}</p>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">وضعیت:</Label>
                <div
                  className={`inline-block text-xs px-3 py-1 rounded-full ${
                    selectedAppointment.status === "confirmed"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {selectedAppointment.status === "confirmed" ? "تایید شده" : "در انتظار تایید"}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">یادداشت:</Label>
                <p className="text-sm">{selectedAppointment.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
