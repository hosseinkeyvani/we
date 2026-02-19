"use client"

import type React from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, CheckCircle2, Send, CalendarIcon } from "lucide-react"

export default function ConsultantAssignments() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [sendTaskOpen, setSendTaskOpen] = useState(false)
  const [sendScheduleOpen, setSendScheduleOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "consultant")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const assignments = [
    {
      id: "1",
      student: "علی محمدی",
      title: "تمرین ریاضی - فصل 3",
      description: "حل تمرینات صفحه 45 تا 50",
      submittedDate: "1403/10/01",
      reviewed: false,
    },
    {
      id: "2",
      student: "سارا احمدی",
      title: "گزارش آزمایش فیزیک",
      description: "نوشتن گزارش آزمایش الکتریسیته",
      submittedDate: "1403/09/30",
      reviewed: false,
    },
    {
      id: "3",
      student: "محمد رضایی",
      title: "خلاصه فصل شیمی",
      description: "خلاصه نویسی فصل 4",
      submittedDate: "1403/09/27",
      reviewed: true,
      feedback: "عالی بود! ادامه بده",
    },
  ]

  const handleSendTask = (e: React.FormEvent) => {
    e.preventDefault()
    setSendTaskOpen(false)
  }

  const handleSendSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    setSendScheduleOpen(false)
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">مدیریت تکالیف و برنامه‌ها</h1>
          <p className="text-muted-foreground mt-2">ارسال تکلیف، برنامه و بازخورد به دانش‌آموزان</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={sendTaskOpen} onOpenChange={setSendTaskOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Send className="h-4 w-4 ml-2" />
                ارسال تکلیف
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>ارسال تکلیف جدید</DialogTitle>
                <DialogDescription>تکلیف جدید برای دانش‌آموزان خود ارسال کنید</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSendTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student">انتخاب دانش‌آموز</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="دانش‌آموز را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">علی محمدی</SelectItem>
                      <SelectItem value="2">سارا احمدی</SelectItem>
                      <SelectItem value="3">محمد رضایی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taskTitle">عنوان تکلیف</Label>
                  <Input id="taskTitle" placeholder="مثال: تمرین ریاضی فصل 5" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taskDescription">توضیحات</Label>
                  <Textarea id="taskDescription" placeholder="جزئیات تکلیف..." rows={4} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">مهلت تحویل</Label>
                  <Input id="dueDate" type="date" required />
                </div>
                <Button type="submit" className="w-full">
                  ارسال تکلیف
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={sendScheduleOpen} onOpenChange={setSendScheduleOpen}>
            <DialogTrigger asChild>
              <Button>
                <CalendarIcon className="h-4 w-4 ml-2" />
                ارسال برنامه کلاسی
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>ارسال برنامه کلاسی</DialogTitle>
                <DialogDescription>برنامه هفتگی برای دانش‌آموزان خود ارسال کنید</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSendSchedule} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduleStudent">انتخاب دانش‌آموز</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="دانش‌آموز را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">علی محمدی</SelectItem>
                      <SelectItem value="2">سارا احمدی</SelectItem>
                      <SelectItem value="3">محمد رضایی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleWeek">هفته</Label>
                  <Input id="scheduleWeek" placeholder="هفته اول آذر" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleDetails">جزئیات برنامه</Label>
                  <Textarea id="scheduleDetails" placeholder="برنامه روزانه..." rows={6} required />
                </div>
                <Button type="submit" className="w-full">
                  ارسال برنامه
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">در انتظار بررسی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{assignments.filter((a) => !a.reviewed).length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">بررسی شده</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{assignments.filter((a) => a.reviewed).length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">تکالیف در انتظار بررسی</h2>
        <div className="space-y-4">
          {assignments
            .filter((a) => !a.reviewed)
            .map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>
                        {assignment.student} - ارسال شده در {assignment.submittedDate}
                      </CardDescription>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{assignment.description}</p>

                  <Dialog open={feedbackOpen && selectedAssignment === assignment.id} onOpenChange={setFeedbackOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedAssignment(assignment.id)}>ارسال بازخورد</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>بازخورد به تکلیف</DialogTitle>
                        <DialogDescription>نظرات و پیشنهادات خود را برای دانش‌آموز بنویسید</DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="feedback">بازخورد</Label>
                          <Textarea id="feedback" placeholder="نظرات شما..." rows={6} />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          onClick={() => {
                            setFeedbackOpen(false)
                            setSelectedAssignment(null)
                          }}
                        >
                          ارسال بازخورد
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">تکالیف بررسی شده</h2>
        <div className="space-y-4">
          {assignments
            .filter((a) => a.reviewed)
            .map((assignment) => (
              <Card key={assignment.id} className="border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>
                        {assignment.student} - ارسال شده در {assignment.submittedDate}
                      </CardDescription>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">{assignment.description}</p>
                  {assignment.feedback && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">بازخورد ارسال شده:</p>
                      <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </main>
  )
}
