"use client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockCourses, mockVideos } from "@/lib/mock-data"
import { VideoCard } from "@/components/video-card"
import Link from "next/link"

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">دوره‌ها و ویدئوهای آموزشی</h1>
          <p className="text-muted-foreground text-pretty">تمامی دوره‌های آموزشی و ویدئوهای مشاوره تحصیلی</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">همه</TabsTrigger>
            <TabsTrigger value="courses">دوره‌ها</TabsTrigger>
            <TabsTrigger value="videos">ویدئوها</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6">دوره‌های آموزشی</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video relative bg-muted">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="object-cover w-full h-full"
                      />
                      {course.isFree && (
                        <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          رایگان
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-balance">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{course.duration}</span>
                        <span className="font-semibold text-primary">
                          {course.isFree ? "رایگان" : `${course.price.toLocaleString("fa-IR")} تومان`}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/courses/${course.id}`}>مشاهده جزئیات</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">ویدئوهای آموزشی</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {mockVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="courses">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video relative bg-muted">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                    {course.isFree && (
                      <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        رایگان
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-balance">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{course.duration}</span>
                      <span className="font-semibold text-primary">
                        {course.isFree ? "رایگان" : `${course.price.toLocaleString("fa-IR")} تومان`}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/courses/${course.id}`}>مشاهده جزئیات</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mockVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
