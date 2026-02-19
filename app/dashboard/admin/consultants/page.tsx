"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mockConsultants } from "@/lib/mock-data"
import { Plus, Edit, Trash2, Star } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function AdminConsultantsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [consultants, setConsultants] = useState(mockConsultants)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "admin") {
    return null
  }

  const handleAddConsultant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDialogOpen(false)
  }

  const handleToggleActive = (id: string) => {
    setConsultants(consultants.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)))
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">مدیریت مشاوران</h1>
          <p className="text-muted-foreground mt-2">افزودن و مدیریت مشاوران سیستم</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              افزودن مشاور جدید
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>افزودن مشاور جدید</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddConsultant} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">نام</Label>
                  <Input id="firstName" placeholder="نام" required />
                </div>
                <div>
                  <Label htmlFor="lastName">نام خانوادگی</Label>
                  <Input id="lastName" placeholder="نام خانوادگی" required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">ایمیل</Label>
                <Input id="email" type="email" placeholder="example@email.com" required />
              </div>
              <div>
                <Label htmlFor="phone">شماره تلفن</Label>
                <Input id="phone" placeholder="09123456789" required />
              </div>
              <div>
                <Label htmlFor="specialization">تخصص‌ها (با کاما جدا کنید)</Label>
                <Input id="specialization" placeholder="ریاضی، فیزیک" required />
              </div>
              <Button type="submit" className="w-full">
                افزودن مشاور
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {consultants.map((consultant) => (
          <Card key={consultant.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>
                    {consultant.firstName} {consultant.lastName}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{consultant.rating}</span>
                    <span className="text-sm text-muted-foreground">• {consultant.students} دانش‌آموز</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {consultant.specialization.map((spec) => (
                      <Badge key={spec} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`active-${consultant.id}`} className="text-sm">
                      فعال
                    </Label>
                    <Switch
                      id={`active-${consultant.id}`}
                      checked={consultant.isActive}
                      onCheckedChange={() => handleToggleActive(consultant.id)}
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
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">تاریخ عضویت: {consultant.joinDate}</span>
                <div className="flex gap-2">
                  <span className="text-muted-foreground">{consultant.email}</span>
                  <span className="text-muted-foreground">• {consultant.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
