"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProtectedCourseLink() {
  const { user } = useAuth()

  return (
    <Button asChild variant="outline">
      <Link href={user ? "/courses" : "/auth"}>مشاهده بیشتر دوره‌ها</Link>
    </Button>
  )
}
