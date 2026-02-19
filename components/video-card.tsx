"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, Play } from "lucide-react"
import { useState } from "react"
import type { Video } from "@/lib/mock-data"
import Link from "next/link"

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  const { addToCart, items } = useCart()
  const [added, setAdded] = useState(false)
  const isInCart = items.some((item) => item.id === video.id)

  const handleAddToCart = () => {
    if (video.isFree || isInCart) return

    addToCart({
      id: video.id,
      title: video.title,
      price: video.price,
      image: video.thumbnail,
      type: "video",
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Card className="overflow-hidden flex flex-col">
      <Link href={`/watch/${video.id}`} className="cursor-pointer">
        <div className="aspect-video relative bg-muted group">
          <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-12 w-12 text-white" />
          </div>
          {video.isFree && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
              رایگان
            </div>
          )}
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="text-balance line-clamp-2">{video.title}</CardTitle>
        <CardDescription className="line-clamp-2">{video.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{video.duration}</span>
          <span className="font-semibold text-primary">
            {video.isFree ? "رایگان" : `${video.price.toLocaleString("fa-IR")} تومان`}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        {video.isFree ? (
          <Button className="w-full bg-transparent" variant="outline" asChild>
            <Link href={`/watch/${video.id}`}>
              <Play className="h-4 w-4 ml-2" />
              تماشا رایگان
            </Link>
          </Button>
        ) : isInCart ? (
          <Button className="w-full" variant="secondary" disabled>
            در سبد خرید موجود است
          </Button>
        ) : (
          <Button className="w-full" onClick={handleAddToCart} disabled={added}>
            <ShoppingCart className="h-4 w-4 ml-2" />
            {added ? "اضافه شد!" : "افزودن به سبد خرید"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
