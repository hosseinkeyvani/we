"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockStudents } from "@/lib/mock-data"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminStudentsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "admin") {
    return null
  }

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.includes(searchTerm) ||
      student.lastName.includes(searchTerm) ||
      student.email.includes(searchTerm) ||
      student.phone.includes(searchTerm),
  )

  const getFieldLabel = (field: string) => {
    const labels = {
      experimental: "تجربی",
      math: "ریاضی",
      humanities: "انسانی",
    }
    return labels[field as keyof typeof labels] || field
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Removed DashboardNav component as it's in layout */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">لیست دانش‌آموزان</h1>
          <p className="text-muted-foreground mt-2">مشاهده و مدیریت دانش‌آموزان سیستم</p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="جستجو دانش‌آموز..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredStudents.map((student) => (
            <Card key={student.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {student.firstName} {student.lastName}
                  </span>
                  <Badge variant="secondary">{getFieldLabel(student.field)}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">ایمیل:</span>
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تلفن:</span>
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">پایه:</span>
                  <span>{student.grade}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تاریخ عضویت:</span>
                  <span>{student.joinDate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
