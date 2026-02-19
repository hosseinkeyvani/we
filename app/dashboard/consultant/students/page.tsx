"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Mail, Phone } from "lucide-react"

export default function ConsultantStudents() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "consultant")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const students = [
    {
      id: "1",
      name: "علی محمدی",
      email: "ali@example.com",
      phone: "09123456789",
      joinDate: "1403/08/01",
      sessionsCount: 12,
      status: "active",
    },
    {
      id: "2",
      name: "سارا احمدی",
      email: "sara@example.com",
      phone: "09123456788",
      joinDate: "1403/07/15",
      sessionsCount: 18,
      status: "active",
    },
    {
      id: "3",
      name: "محمد رضایی",
      email: "mohammad@example.com",
      phone: "09123456787",
      joinDate: "1403/09/01",
      sessionsCount: 6,
      status: "active",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">دانش‌آموزان</h1>
          <p className="text-muted-foreground">مدیریت و پیگیری دانش‌آموزان</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>تعداد کل دانش‌آموزان</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{students.length}</div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {students.map((student) => (
            <Card key={student.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{student.name}</CardTitle>
                      <CardDescription>عضویت از {student.joinDate}</CardDescription>
                    </div>
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">فعال</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{student.sessionsCount}</span> جلسه مشاوره
                  </div>
                </div>
                <div className="flex gap-2">
                  <button variant="outline" size="sm">
                    مشاهده برنامه
                  </button>
                  <button variant="outline" size="sm">
                    تکالیف
                  </button>
                  <button size="sm">پروفایل</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
