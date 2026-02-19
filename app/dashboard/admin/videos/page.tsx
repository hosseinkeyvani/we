"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mockVideos } from "@/lib/mock-data"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function AdminVideosPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [videos, setVideos] = useState(mockVideos)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "admin") {
    return null
  }

  const handleAddVideo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Removed DashboardNav as it's in layout */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">مدیریت ویدئوهای آموزشی</h1>
            <p className="text-muted-foreground mt-2">افزودن و مدیریت ویدئوهای دوره</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                افزودن ویدئو جدید
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>افزودن ویدئو جدید</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <Label htmlFor="title">عنوان ویدئو</Label>
                  <Input id="title" placeholder="عنوان ویدئو" required />
                </div>
                <div>
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea id="description" placeholder="توضیحات ویدئو" rows={3} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="price">قیمت (تومان)</Label>
                    <Input id="price" type="number" placeholder="150000" required />
                  </div>
                  <div>
                    <Label htmlFor="duration">مدت زمان</Label>
                    <Input id="duration" placeholder="2 ساعت" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="thumbnail">تصویر بند انگشتی</Label>
                  <Input id="thumbnail" type="file" accept="image/*" />
                </div>
                <div>
                  <Label htmlFor="video">فایل ویدئو</Label>
                  <Input id="video" type="file" accept="video/*" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="isFree" />
                  <Label htmlFor="isFree">رایگان</Label>
                </div>
                <Button type="submit" className="w-full">
                  افزودن ویدئو
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card key={video.id}>
              <div className="aspect-video relative bg-muted">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="object-cover w-full h-full"
                />
                {video.isFree && (
                  <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    رایگان
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{video.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{video.duration}</span>
                  <span className="font-semibold text-primary">
                    {video.isFree ? "رایگان" : `${video.price.toLocaleString("fa-IR")} تومان`}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
