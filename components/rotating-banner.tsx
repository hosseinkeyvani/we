"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { mockNews } from "@/lib/mock-data"

export function RotatingBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % mockNews.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % mockNews.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + mockNews.length) % mockNews.length)
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg">
      {mockNews.map((news, index) => (
        <div
          key={news.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBanner ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full bg-gradient-to-r from-primary/90 to-primary flex items-center justify-center p-8 md:p-12">
            <div className="text-center text-primary-foreground">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">{news.title}</h2>
              <p className="text-lg md:text-xl text-pretty">{news.content}</p>
              {news.link && (
                <Button asChild variant="secondary" size="lg" className="mt-6">
                  <a href={news.link} target="_blank" rel="noopener noreferrer">
                    اطلاعات بیشتر
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 text-primary-foreground"
        onClick={prevBanner}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 text-primary-foreground"
        onClick={nextBanner}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {mockNews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentBanner ? "bg-primary-foreground w-8" : "bg-primary-foreground/50"
            }`}
            aria-label={`برو به خبر ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
