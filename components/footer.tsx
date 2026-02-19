import { Phone, Mail, MapPin, Send } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* تماس تلفنی */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">تماس تلفنی</h3>
              <p className="text-sm opacity-90">۰۲۱-۱۲۳۴۵۶۷۸</p>
              <p className="text-sm opacity-90">۰۹۱۲-۱۲۳۴۵۶۷</p>
            </div>
          </div>

          {/* آدرس */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">آدرس</h3>
              <p className="text-sm opacity-90">تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲۳</p>
            </div>
          </div>

          {/* ایمیل */}
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">پست الکترونیک</h3>
              <p className="text-sm opacity-90">info@edu-consult.ir</p>
              <p className="text-sm opacity-90">support@edu-consult.ir</p>
            </div>
          </div>

          {/* فرم تماس */}
          <div className="flex items-start gap-3">
            <Send className="w-5 h-5 mt-1 flex-shrink-0" />
            <div className="w-full">
              <h3 className="font-semibold mb-2">ارتباط با ما</h3>
              <Link
                href="/contact"
                className="inline-block text-sm bg-background text-foreground px-4 py-2 rounded-lg hover:bg-background/90 transition-colors"
              >
                ارسال پیام
              </Link>
            </div>
          </div>
        </div>

        {/* کپی رایت */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-80">
          <p>تمامی حقوق محفوظ است © ۱۴۰۳ مشاوره تحصیلی</p>
        </div>
      </div>
    </footer>
  )
}
