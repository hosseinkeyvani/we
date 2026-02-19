"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const daysOfWeek = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"]

const mockSchedule = {
  شنبه: [
    { id: "1", time: "08:00 - 10:00", subject: "ریاضی", description: "فصل 3 - مشتق", completed: true },
    { id: "2", time: "10:30 - 12:00", subject: "فیزیک", description: "حل تمرین فصل 2", completed: false },
  ],
  یکشنبه: [
    { id: "3", time: "08:00 - 10:00", subject: "شیمی", description: "مرور اتم‌ها", completed: false },
    { id: "4", time: "14:00 - 16:00", subject: "زیست", description: "یادگیری سلول", completed: false },
  ],
  دوشنبه: [{ id: "5", time: "08:00 - 10:00", subject: "ریاضی", description: "انتگرال", completed: false }],
  سه‌شنبه: [{ id: "6", time: "10:00 - 12:00", subject: "فیزیک", description: "الکتریسیته", completed: false }],
  چهارشنبه: [{ id: "7", time: "08:00 - 10:00", subject: "شیمی", description: "آزمایش عملی", completed: false }],
  پنج‌شنبه: [],
  جمعه: [],
}

export default function StudentSchedule() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [schedule, setSchedule] = useState(mockSchedule)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const toggleTask = (day: string, taskId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day as keyof typeof prev].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    }))
  }

  return (
    <div className="container py-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">برنامه هفتگی</h1>
        <p className="text-muted-foreground">برنامه درسی و وظایف هفتگی شما</p>
      </div>

      <div className="grid gap-4 mt-6">
        {daysOfWeek.map((day) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{day}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {schedule[day as keyof typeof schedule].length} وظیفه
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {schedule[day as keyof typeof schedule].length === 0 ? (
                <p className="text-sm text-muted-foreground">بدون برنامه</p>
              ) : (
                <div className="space-y-3">
                  {schedule[day as keyof typeof schedule].map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <Checkbox
                        id={task.id}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(day, task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.subject}
                          </p>
                          <span className="text-xs text-muted-foreground">{task.time}</span>
                        </div>
                        <p className={`text-sm ${task.completed ? "text-muted-foreground" : ""}`}>{task.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
