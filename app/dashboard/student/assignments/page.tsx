"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function StudentAssignments() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [submitOpen, setSubmitOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [uploadFile, setUploadFile] = useState<File | null>(null)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const assignments = [
    {
      id: "1",
      title: "تمرین ریاضی - فصل 3",
      description: "حل تمرینات صفحه 45 تا 50",
      dueDate: "1403/10/10",
      submitted: false,
      details: "این تمرین شامل مسائل مربوط به مشتق و انتگرال است. لطفا تمام مراحل حل را نشان دهید.",
    },
    {
      id: "2",
      title: "گزارش آزمایش فیزیک",
      description: "نوشتن گزارش آزمایش الکتریسیته",
      dueDate: "1403/10/12",
      submitted: false,
      details: "گزارش باید شامل مقدمه، روش انجام آزمایش، نتایج و نتیجه گیری باشد. حداقل 5 صفحه.",
    },
    {
      id: "3",
      title: "خلاصه فصل شیمی",
      description: "خلاصه نویسی فصل 4",
      dueDate: "1403/09/28",
      submitted: true,
      submittedDate: "1403/09/27",
      feedback: "عالی بود! ادامه بده",
      details: "خلاصه نویسی فصل واکنش های شیمیایی با ذکر مثال های کاربردی.",
    },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0])
    }
  }

  const handleSubmitAssignment = () => {
    console.log("[v0] Submitting assignment with file:", uploadFile)
    // در پروژه واقعی فایل به سرور ارسال می‌شود
    setSubmitOpen(false)
    setUploadFile(null)
  }

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">تکالیف</h1>
          <p className="text-muted-foreground">مدیریت و ارسال تکالیف درسی</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">تکالیف در انتظار</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">2</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">تکالیف ارسال شده</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">تکالیف در انتظار ارسال</h2>
            <div className="space-y-4">
              {assignments
                .filter((a) => !a.submitted)
                .map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <CardDescription>مهلت: {assignment.dueDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{assignment.description}</p>
                      <div className="flex gap-2">
                        <Dialog
                          open={detailsOpen && selectedAssignment?.id === assignment.id}
                          onOpenChange={(open) => {
                            setDetailsOpen(open)
                            if (open) setSelectedAssignment(assignment)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Info className="h-4 w-4 ml-2" />
                              جزئیات
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>{assignment.title}</DialogTitle>
                              <DialogDescription>جزئیات کامل تکلیف</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label className="text-sm font-medium">توضیحات:</Label>
                                <p className="text-sm text-muted-foreground mt-2">{assignment.description}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">جزئیات کامل:</Label>
                                <p className="text-sm text-muted-foreground mt-2">{assignment.details}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">مهلت تحویل:</Label>
                                <p className="text-sm text-muted-foreground mt-2">{assignment.dueDate}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog
                          open={submitOpen && selectedAssignment?.id === assignment.id}
                          onOpenChange={(open) => {
                            setSubmitOpen(open)
                            if (open) setSelectedAssignment(assignment)
                            if (!open) setUploadFile(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button>
                              <Upload className="h-4 w-4 ml-2" />
                              ارسال تکلیف
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>ارسال تکلیف</DialogTitle>
                              <DialogDescription>فرم ارسال تکلیف {assignment.title}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="submitter-name">نام ارسال کننده</Label>
                                <Input id="submitter-name" value={user.name} disabled className="bg-muted" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="submit-date">تاریخ ارسال</Label>
                                <Input
                                  id="submit-date"
                                  value={new Date().toLocaleDateString("fa-IR")}
                                  disabled
                                  className="bg-muted"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="subject">موضوع</Label>
                                <Input id="subject" value={assignment.title} disabled className="bg-muted" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="description">توضیحات (اختیاری)</Label>
                                <Textarea id="description" placeholder="توضیحات اضافی در مورد تکلیف..." rows={3} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="file-upload">فایل تکلیف</Label>
                                <Input
                                  id="file-upload"
                                  type="file"
                                  onChange={handleFileChange}
                                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
                                  className="cursor-pointer"
                                />
                                <p className="text-xs text-muted-foreground">
                                  فرمت های مجاز: PDF, Word, Text, Image, ZIP
                                </p>
                                {uploadFile && (
                                  <p className="text-sm text-primary">فایل انتخاب شده: {uploadFile.name}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setSubmitOpen(false)}>
                                انصراف
                              </Button>
                              <Button onClick={handleSubmitAssignment} disabled={!uploadFile}>
                                <Upload className="h-4 w-4 ml-2" />
                                ارسال
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">تکالیف ارسال شده</h2>
            <div className="space-y-4">
              {assignments
                .filter((a) => a.submitted)
                .map((assignment) => (
                  <Card key={assignment.id} className="border-primary/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">ارسال شده</div>
                      </div>
                      <CardDescription>
                        ارسال شده در: {assignment.submittedDate} | مهلت: {assignment.dueDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">{assignment.description}</p>
                      <Dialog
                        open={detailsOpen && selectedAssignment?.id === assignment.id}
                        onOpenChange={(open) => {
                          setDetailsOpen(open)
                          if (open) setSelectedAssignment(assignment)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            <Info className="h-4 w-4 ml-2" />
                            مشاهده جزئیات
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>{assignment.title}</DialogTitle>
                            <DialogDescription>جزئیات تکلیف ارسال شده</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label className="text-sm font-medium">توضیحات:</Label>
                              <p className="text-sm text-muted-foreground mt-2">{assignment.description}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">جزئیات کامل:</Label>
                              <p className="text-sm text-muted-foreground mt-2">{assignment.details}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">تاریخ ارسال:</Label>
                              <p className="text-sm text-muted-foreground mt-2">{assignment.submittedDate}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {assignment.feedback && (
                        <div className="mt-4 p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium mb-1">بازخورد مشاور:</p>
                          <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
