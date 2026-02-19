"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { Trash2, ShoppingBag, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function CartPage() {
  const { items, removeFromCart, clearCart, totalPrice } = useCart()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleCheckout = () => {
    // Mock payment process
    setShowSuccess(true)
    setTimeout(() => {
      clearCart()
      setShowSuccess(false)
      router.push("/")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <Card className="text-center py-12">
            <CardHeader>
              <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">سبد خرید شما خالی است</CardTitle>
              <CardDescription>هنوز هیچ دوره یا ویدئویی به سبد خرید اضافه نکرده‌اید</CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Button asChild>
                <Link href="/">بازگشت به صفحه اصلی</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">سبد خرید</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  <div className="w-full sm:w-32 aspect-video bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg text-balance">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.type === "video" ? "ویدئو آموزشی" : "دوره آموزشی"}
                    </p>
                    <p className="text-lg font-bold text-primary">{item.price.toLocaleString("fa-IR")} تومان</p>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>خلاصه سبد خرید</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تعداد آیتم‌ها:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>مجموع:</span>
                    <span className="text-primary">{totalPrice.toLocaleString("fa-IR")} تومان</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" onClick={handleCheckout}>
                  <CreditCard className="h-4 w-4 ml-2" />
                  پرداخت و خرید
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/">ادامه خرید</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>خرید موفق!</DialogTitle>
            <DialogDescription>پرداخت شما با موفقیت انجام شد. به زودی به صفحه اصلی منتقل می‌شوید.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
