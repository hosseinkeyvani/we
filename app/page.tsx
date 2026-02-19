import Link from "next/link"
import { Header } from "@/components/header"
import { RotatingBanner } from "@/components/rotating-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { mockConsultationPlans, mockVideos, mockConsultants } from "@/lib/mock-data"
import { Calendar, BookOpen, FileText, GraduationCap, ShoppingCart, User } from "lucide-react"
import { VideoCard } from "@/components/video-card"
import { ProtectedCourseLink } from "@/components/protected-course-link"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-12">
        <RotatingBanner />

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">طرح‌های مشاوره</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockConsultationPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-balance">{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{plan.price.toLocaleString("fa-IR")}</span>
                    <span className="text-sm text-muted-foreground">تومان / ماه</span>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button asChild className="flex-1">
                    <Link href="/auth">ثبت نام</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/cart?plan=${plan.id}`}>
                      <ShoppingCart className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">نوبت‌دهی آنلاین</h2>
          <Card className="bg-gradient-to-l from-primary/10 to-accent/10">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">رزرو جلسه مشاوره</CardTitle>
              <CardDescription>با مشاوران متخصص ما در زمان دلخواه خود جلسه مشاوره داشته باشید</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>انتخاب زمان دلخواه</span>
                </li>
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>انتخاب مشاور تخصصی</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>جلسه آنلاین یا حضوری</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/appointments">رزرو نوبت</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">مشاوران تخصصی</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockConsultants.map((consultant) => (
              <Card key={consultant.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{consultant.name}</CardTitle>
                      <CardDescription>{consultant.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {consultant.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{consultant.bio}</p>
                  <div className="text-sm">
                    <span className="font-semibold">{consultant.experience}</span> سال سابقه
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/appointments?consultant=${consultant.id}`}>رزرو نوبت</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">ویدئوهای آموزشی</h2>
            <ProtectedCourseLink />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mockVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">خدمات ما</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>نوبت‌دهی آنلاین</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-pretty">رزرو جلسه مشاوره به صورت آنلاین</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>برنامه‌ریزی هفتگی</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-pretty">برنامه درسی شخصی‌سازی شده</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle>تست‌های روانشناسی</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-pretty">ارزیابی شخصیت و استعداد</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-chart-4/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle>دوره‌های آموزشی ویدئویی</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-pretty">دسترسی به ویدئوهای آموزشی تخصصی</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50 mt-12">
        <div className="container py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>تمامی حقوق محفوظ است © 1403 مشاوره تحصیلی</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
