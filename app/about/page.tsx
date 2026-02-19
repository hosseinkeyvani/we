import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Target, Users, Heart } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SidebarNav />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">درباره مرکز مشاوره تحصیلی</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            با بیش از ۱۰ سال تجربه در زمینه مشاوره تحصیلی، ما به دانش‌آموزان کمک می‌کنیم تا به بهترین نسخه خودشان تبدیل
            شوند
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                ماموریت ما
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                هدف ما ارائه بهترین خدمات مشاوره تحصیلی به دانش‌آموزان و کمک به آن‌ها برای دستیابی به اهداف تحصیلی و
                شغلی‌شان است. ما با استفاده از جدیدترین روش‌های علمی و تیم مجرب مشاوران، مسیر موفقیت را هموار می‌کنیم.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                ارزش‌های ما
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• تعهد به کیفیت و تعالی</li>
                <li>• توجه به نیازهای فردی هر دانش‌آموز</li>
                <li>• استفاده از روش‌های علمی و به‌روز</li>
                <li>• حمایت مستمر و پیگیری دقیق</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">رئیس مرکز مشاوره</CardTitle>
            <CardDescription>دکتر محمد رضایی - متخصص روانشناسی تحصیلی</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
                <Image src="/professional-headshot.png" alt="دکتر محمد رضایی" fill className="object-cover" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                دکتر محمد رضایی با بیش از ۱۵ سال سابقه در زمینه مشاوره تحصیلی و روانشناسی، بنیان‌گذار و مدیر این مرکز
                است. ایشان دارای دکترای روانشناسی تحصیلی از دانشگاه تهران و مدرک تخصصی مشاوره از دانشگاه‌های معتبر
                بین‌المللی هستند.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                تخصص دکتر رضایی در زمینه برنامه‌ریزی تحصیلی، مدیریت استرس امتحانات و راهنمایی شغلی باعث شده تا بیش از
                ۲۰۰۰ دانش‌آموز با موفقیت به اهداف خود برسند.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm">۱۵+ سال تجربه</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">۲۰۰۰+ دانش‌آموز موفق</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl text-primary">۱۵+</CardTitle>
              <CardDescription>سال تجربه</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl text-primary">۲۰۰۰+</CardTitle>
              <CardDescription>دانش‌آموز موفق</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl text-primary">۵۰+</CardTitle>
              <CardDescription>مشاور متخصص</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  )
}
