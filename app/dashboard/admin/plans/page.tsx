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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockConsultationPlans } from "@/lib/mock-data"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function AdminPlansPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [plans, setPlans] = useState(mockConsultationPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "admin") {
    return null
  }

  const handleAddPlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDialogOpen(false)
  }

  const handleToggleActive = (id: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)))
  }

  const getFieldLabel = (field: string) => {
    const labels = {
      all: "همه رشته‌ها",
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">مدیریت طرح‌های مشاوره</h1>
            <p className="text-muted-foreground mt-2">افزودن و مدیریت طرح‌های مشاوره</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                افزودن طرح جدید
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>افزودن طرح مشاوره جدید</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddPlan} className="space-y-4">
                <div>
                  <Label htmlFor="title">عنوان طرح</Label>
                  <Input id="title" placeholder="عنوان طرح" required />
                </div>
                <div>
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea id="description" placeholder="توضیحات طرح" rows={3} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="price">قیمت (تومان)</Label>
                    <Input id="price" type="number" placeholder="5000000" required />
                  </div>
                  <div>
                    <Label htmlFor="duration">مدت زمان</Label>
                    <Input id="duration" placeholder="12 ماه" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="field">رشته تحصیلی</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب رشته" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه رشته‌ها</SelectItem>
                      <SelectItem value="experimental">تجربی</SelectItem>
                      <SelectItem value="math">ریاضی</SelectItem>
                      <SelectItem value="humanities">انسانی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="features">ویژگی‌ها (هر خط یک ویژگی)</Label>
                  <Textarea id="features" placeholder="جلسات هفتگی آنلاین" rows={4} required />
                </div>
                <Button type="submit" className="w-full">
                  افزودن طرح
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{plan.title}</CardTitle>
                      <Badge variant="outline">{getFieldLabel(plan.field)}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="font-semibold text-primary">{plan.price.toLocaleString("fa-IR")} تومان</span>
                      <span className="text-muted-foreground">• {plan.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`active-${plan.id}`} className="text-sm">
                        فعال
                      </Label>
                      <Switch
                        id={`active-${plan.id}`}
                        checked={plan.isActive}
                        onCheckedChange={() => handleToggleActive(plan.id)}
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
                <div className="space-y-2">
                  <p className="text-sm font-medium">ویژگی‌ها:</p>
                  <ul className="text-sm space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
