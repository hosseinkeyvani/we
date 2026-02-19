"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { User, Mail, Phone, BookOpen, Save } from "lucide-react"

export default function StudentProfilePage() {
  const { user } = useAuth()
  const [firstName, setFirstName] = useState("علی")
  const [lastName, setLastName] = useState("احمدی")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("09121234567")
  const [grade, setGrade] = useState("12")
  const [field, setField] = useState("ریاضی")
  const [bio, setBio] = useState("")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    alert("تغییرات با موفقیت ذخیره شد")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">پروفایل من</h1>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات شخصی</CardTitle>
              <CardDescription>اطلاعات حساب کاربری خود را مدیریت کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">نام</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="نام خود را وارد کنید"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">نام خانوادگی</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline ml-2" />
                  ایمیل
                </Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="h-4 w-4 inline ml-2" />
                  شماره تماس
                </Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} dir="ltr" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>اطلاعات تحصیلی</CardTitle>
              <CardDescription>اطلاعات مربوط به تحصیلات خود را وارد کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">
                    <BookOpen className="h-4 w-4 inline ml-2" />
                    پایه تحصیلی
                  </Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger id="grade">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">دهم</SelectItem>
                      <SelectItem value="11">یازدهم</SelectItem>
                      <SelectItem value="12">دوازدهم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field">رشته تحصیلی</Label>
                  <Select value={field} onValueChange={setField}>
                    <SelectTrigger id="field">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ریاضی">ریاضی</SelectItem>
                      <SelectItem value="تجربی">تجربی</SelectItem>
                      <SelectItem value="انسانی">انسانی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">درباره من</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="توضیحاتی در مورد خود، اهداف تحصیلی و..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              <Save className="h-4 w-4 ml-2" />
              ذخیره تغییرات
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
