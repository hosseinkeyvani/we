"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const purchasedCourses = [
  {
    id: 1,
    title: "تکنیک‌های حل مسائل ریاضی",
    description: "آموزش روش‌های سریع و موثر برای حل مسائل ریاضی",
    thumbnail: "/math-techniques.jpg",
    duration: "2 ساعت و 30 دقیقه",
    progress: 65,
    totalLessons: 12,
    completedLessons: 8,
  },
  {
    id: 2,
    title: "تقویت حافظه و تمرکز",
    description: "روش‌های علمی برای بهبود حافظه در مطالعه",
    thumbnail: "/memory-techniques.png",
    duration: "1 ساعت و 45 دقیقه",
    progress: 100,
    totalLessons: 8,
    completedLessons: 8,
  },
]

export default function MyCoursesPage() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth")
    } else {
      setIsLoading(false)
    }
  }, [isLoggedIn, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">دوره‌های من</h1>
          <p className="text-muted-foreground text-lg">به دوره‌های خریداری شده خود دسترسی داشته باشید</p>
        </div>

        {purchasedCourses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">شما هنوز دوره‌ای خریداری نکرده‌اید</p>
              <Link href="/courses">
                <Button>مشاهده دوره‌های آموزشی</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {purchasedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  {course.progress === 100 && (
                    <Badge className="absolute top-2 left-2 bg-green-500">
                      <CheckCircle2 className="w-3 h-3 ml-1" />
                      تکمیل شده
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-balance">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>پیشرفت دوره</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {course.completedLessons} از {course.totalLessons} درس
                    </p>
                  </div>

                  <Button className="w-full" variant={course.progress === 100 ? "outline" : "default"} asChild>
                    <Link href={`/watch/${course.id}`}>
                      <Play className="w-4 h-4 ml-2" />
                      {course.progress === 100 ? "مرور دوره" : "ادامه یادگیری"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
