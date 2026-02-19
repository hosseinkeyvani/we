"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard, Lock, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function PaymentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [cardNumber, setCardNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [expiry, setExpiry] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  if (!user) {
    router.push("/auth")
    return null
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("پرداخت با موفقیت انجام شد!")
      router.push("/dashboard/student")
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">پرداخت آنلاین</h1>

        <div className="space-y-6">
          <Card className="bg-gradient-to-l from-primary/10 to-accent/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle>پرداخت امن</CardTitle>
              </div>
              <CardDescription>اطلاعات پرداخت شما کاملا ایمن و رمزنگاری شده است</CardDescription>
            </CardHeader>
          </Card>

          <form onSubmit={handlePayment}>
            <Card>
              <CardHeader>
                <CardTitle>اطلاعات کارت</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">شماره کارت</Label>
                  <div className="relative">
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000-0000-0000-0000"
                      className="pr-10"
                      maxLength={19}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">تاریخ انقضا</Label>
                    <Input
                      id="expiry"
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV2</Label>
                    <Input
                      id="cvv"
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="***"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>مبلغ قابل پرداخت:</span>
                    <span className="font-semibold">۵۰۰,۰۰۰ تومان</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  {isProcessing ? (
                    "در حال پردازش..."
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 ml-2" />
                      تایید و پرداخت
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
