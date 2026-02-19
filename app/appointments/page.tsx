"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { mockConsultants } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { CalendarIcon, Clock } from "lucide-react"

const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
]

function AppointmentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const [selectedConsultant, setSelectedConsultant] = useState(searchParams.get("consultant") || "")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/auth")
      return
    }

    alert("نوبت شما با موفقیت ثبت شد. به صفحه پرداخت منتقل می‌شوید...")
    router.push("/payment")
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">نوبت‌دهی آنلاین</h1>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>رزرو جلسه مشاوره</CardTitle>
              <CardDescription>لطفا اطلاعات مورد نیاز برای رزرو نوبت را وارد کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="consultant">انتخاب مشاور</Label>
                <Select value={selectedConsultant} onValueChange={setSelectedConsultant} required>
                  <SelectTrigger id="consultant">
                    <SelectValue placeholder="مشاور مورد نظر را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockConsultants.map((consultant) => (
                      <SelectItem key={consultant.id} value={consultant.id.toString()}>
                        {consultant.name} - {consultant.specialties.join("، ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">نوع جلسه</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="نوع جلسه را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">آنلاین</SelectItem>
                    <SelectItem value="in-person">حضوری</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  <CalendarIcon className="h-4 w-4 inline ml-2" />
                  انتخاب تاریخ
                </Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">
                  <Clock className="h-4 w-4 inline ml-2" />
                  انتخاب ساعت
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime} required>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="ساعت مورد نظر را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">توضیحات (اختیاری)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="موضوع جلسه یا توضیحات اضافی..."
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" size="lg">
                تایید و پرداخت
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  )
}

export default function AppointmentsPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <AppointmentContent />
    </Suspense>
  )
}
