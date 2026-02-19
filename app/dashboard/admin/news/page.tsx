"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mockNews } from "@/lib/mock-data"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function AdminNewsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [news, setNews] = useState(mockNews)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "admin") {
    return null
  }

  const handleAddNews = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle adding news
    setIsDialogOpen(false)
  }

  const handleToggleActive = (id: string) => {
    setNews(news.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)))
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">مدیریت اخبار</h1>
          <p className="text-muted-foreground mt-2">افزودن و مدیریت اخبار صفحه اصلی</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              افزودن خبر جدید
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>افزودن خبر جدید</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddNews} className="space-y-4">
              <div>
                <Label htmlFor="title">عنوان</Label>
                <Input id="title" placeholder="عنوان خبر" required />
              </div>
              <div>
                <Label htmlFor="content">محتوا</Label>
                <Textarea id="content" placeholder="متن خبر" rows={4} required />
              </div>
              <div>
                <Label htmlFor="image">تصویر</Label>
                <Input id="image" type="file" accept="image/*" />
              </div>
              <Button type="submit" className="w-full">
                افزودن خبر
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">{item.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`active-${item.id}`} className="text-sm">
                      فعال
                    </Label>
                    <Switch
                      id={`active-${item.id}`}
                      checked={item.isActive}
                      onCheckedChange={() => handleToggleActive(item.id)}
                    />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  )
}
