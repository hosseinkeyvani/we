import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Calendar,
  Brain,
  GraduationCap,
  Target,
  Users,
  Video,
  FileText,
  Award,
  TrendingUp,
} from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Calendar,
      title: "مشاوره تحصیلی حضوری و آنلاین",
      description: "جلسات مشاوره فردی با مشاوران متخصص برای برنامه‌ریزی درسی و بهبود عملکرد تحصیلی",
    },
    {
      icon: BookOpen,
      title: "برنامه‌ریزی درسی اختصاصی",
      description: "طراحی برنامه مطالعاتی شخصی‌سازی شده متناسب با سطح و نیاز هر دانش‌آموز",
    },
    {
      icon: Brain,
      title: "تست‌های روانشناسی و شخصیت‌شناسی",
      description: "ارزیابی توانایی‌ها و علایق برای راهنمایی تحصیلی و شغلی بهینه",
    },
    {
      icon: Target,
      title: "هدف‌گذاری و انگیزش",
      description: "کمک به دانش‌آموزان برای تعیین اهداف واقع‌بینانه و افزایش انگیزه درسی",
    },
    {
      icon: Users,
      title: "مشاوره گروهی",
      description: "کارگاه‌های آموزشی گروهی در زمینه مهارت‌های مطالعه و مدیریت زمان",
    },
    {
      icon: Video,
      title: "دوره‌های آموزشی ویدئویی",
      description: "دسترسی به مجموعه کامل ویدئوهای آموزشی در زمینه تکنیک‌های مطالعه و یادگیری",
    },
    {
      icon: FileText,
      title: "پیگیری و ارزیابی مستمر",
      description: "بررسی دوره‌ای پیشرفت تحصیلی و ارائه بازخورد سازنده",
    },
    {
      icon: GraduationCap,
      title: "راهنمایی انتخاب رشته",
      description: "مشاوره تخصصی برای انتخاب رشته دانشگاهی متناسب با علایق و استعدادها",
    },
    {
      icon: Award,
      title: "آماده‌سازی برای کنکور",
      description: "برنامه‌ریزی جامع و استراتژی‌های تست‌زنی برای موفقیت در کنکور",
    },
    {
      icon: TrendingUp,
      title: "بهبود مهارت‌های یادگیری",
      description: "آموزش تکنیک‌های یادگیری مؤثر، تقویت حافظه و افزایش سرعت مطالعه",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SidebarNav />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">خدمات مشاوره تحصیلی</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ما مجموعه کاملی از خدمات مشاوره تحصیلی را برای کمک به موفقیت شما ارائه می‌دهیم
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">چرا ما را انتخاب کنید؟</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">✓ مشاوران مجرب و متخصص</h3>
                <p className="text-muted-foreground">
                  تیم ما از مشاوران دارای مدرک تخصصی و سال‌ها تجربه در زمینه مشاوره تحصیلی تشکیل شده است.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">✓ رویکرد شخصی‌سازی شده</h3>
                <p className="text-muted-foreground">
                  هر دانش‌آموز منحصر به فرد است و ما برنامه‌های مشاوره را متناسب با نیازهای فردی طراحی می‌کنیم.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">✓ پیگیری مستمر</h3>
                <p className="text-muted-foreground">
                  ما تنها به یک جلسه مشاوره بسنده نمی‌کنیم، بلکه پیشرفت شما را به صورت مستمر پیگیری می‌کنیم.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">✓ نتایج اثبات شده</h3>
                <p className="text-muted-foreground">
                  بیش از ۲۰۰۰ دانش‌آموز با کمک ما به اهداف تحصیلی خود رسیده و در کنکور موفق شده‌اند.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
