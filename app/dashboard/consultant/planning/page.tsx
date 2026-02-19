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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus } from "lucide-react"

export default function ConsultantPlanning() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "consultant")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const students = [
    { id: "1", name: "علی محمدی" },
    { id: "2", name: "سارا احمدی" },
    { id: "3", name: "محمد رضایی" },
  ]

  const plans = [
    {
      id: "1",
      student: "علی محمدی",
      subject: "ریاضی - فصل 3",
      date: "1403/10/05",
      time: "08:00 - 10:00",
      status: "active",
    },
    {
      id: "2",
      student: "سارا احمدی",
      subject: "فیزیک - الکتریسیته",
      date: "1403/10/06",
      time: "14:00 - 16:00",
      status: "active",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">برنامه‌ریزی و مدیریت</h1>
            <p className="text-muted-foreground">ایجاد و مدیریت برنامه‌های درسی دانش‌آموزان</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                برنامه جدید
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>ایجاد برنامه درسی جدید</DialogTitle>
                <DialogDescription>برنامه درسی برای دانش‌آموز ایجاد کنید</DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student">انتخاب دانش‌آموز</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="دانش‌آموز را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">موضوع درس</Label>
                  <Input id="subject" placeholder="مثال: ریاضی - فصل 3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">تاریخ</Label>
                    <Input id="date" type="text" placeholder="1403/10/10" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">ساعت</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea id="description" placeholder="جزئیات برنامه درسی..." />
                </div>

                <Button type="submit" className="w-full">
                  ایجاد برنامه
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{plan.student}</CardTitle>
                    <CardDescription>{plan.subject}</CardDescription>
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">فعال</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {plan.date} - {plan.time}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    ویرایش
                  </Button>
                  <Button variant="outline" size="sm">
                    حذف
                  </Button>
                  <Button size="sm">مشاهده جزئیات</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
