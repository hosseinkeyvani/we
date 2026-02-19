"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockVideos } from "@/lib/mock-data"
import { ArrowRight, Lock } from "lucide-react"
import Link from "next/link"

export default function WatchVideoPage() {
  const { isLoggedIn, user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const videoId = Number(params.id)

  const video = mockVideos.find((v) => v.id === videoId)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    if (!video) {
      router.push("/courses")
      return
    }

    // Check if video is free or user has purchased it
    if (video.isFree) {
      setHasAccess(true)
    } else if (isLoggedIn) {
      // In real app, check if user has purchased this video
      // For now, assume logged-in users have access to all purchased videos
      setHasAccess(true)
    } else {
      setHasAccess(false)
    }
  }, [video, isLoggedIn, router])

  if (!video) {
    return null
  }

  if (!hasAccess && !video.isFree) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container max-w-4xl mx-auto px-4 py-12">
          <Card className="text-center">
            <CardHeader>
              <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle className="text-2xl">دسترسی محدود</CardTitle>
              <CardDescription>
                برای مشاهده این ویدئو باید آن را خریداری کنید یا وارد حساب کاربری خود شوید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!isLoggedIn && (
                  <Button asChild>
                    <Link href="/auth">ورود به حساب کاربری</Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href="/courses">بازگشت به دوره‌ها</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container max-w-6xl mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/courses">
            <ArrowRight className="w-4 h-4 ml-2" />
            بازگشت به دوره‌ها
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video controls className="w-full h-full" poster={video.thumbnail}>
                <source src={`/videos/${video.id}.mp4`} type="video/mp4" />
                مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند
              </video>
            </div>

            {/* Video Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-balance mb-2">{video.title}</CardTitle>
                    <CardDescription className="text-base">{video.description}</CardDescription>
                  </div>
                  {video.isFree && (
                    <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold shrink-0">
                      رایگان
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>مدت زمان: {video.duration}</span>
                  {!video.isFree && (
                    <span className="font-semibold text-primary">{video.price.toLocaleString("fa-IR")} تومان</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ویدئوهای مرتبط</h3>
            <div className="space-y-3">
              {mockVideos
                .filter((v) => v.id !== videoId)
                .slice(0, 5)
                .map((relatedVideo) => (
                  <Link key={relatedVideo.id} href={`/watch/${relatedVideo.id}`}>
                    <Card className="overflow-hidden hover:border-primary transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <div className="w-32 aspect-video bg-muted shrink-0">
                          <img
                            src={relatedVideo.thumbnail || "/placeholder.svg"}
                            alt={relatedVideo.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 py-2 pr-2 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">{relatedVideo.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{relatedVideo.duration}</span>
                            {relatedVideo.isFree && (
                              <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">
                                رایگان
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
