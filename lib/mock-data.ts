import type { Course, Post, Appointment, Payment, ConsultationPlan, Consultant, NewsItem, Student } from "./types"

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "دوره آماده‌سازی کنکور تجربی",
    description: "برنامه‌ریزی کامل برای موفقیت در کنکور سراسری رشته تجربی",
    price: 2500000,
    duration: "6 ماه",
    isFree: false,
    image: "/medical-exam-preparation.png",
  },
  {
    id: "2",
    title: "مشاوره رایگان انتخاب رشته",
    description: "جلسه مشاوره رایگان برای انتخاب رشته مناسب",
    price: 0,
    duration: "1 جلسه",
    isFree: true,
    image: "/career-counseling.jpg",
  },
  {
    id: "3",
    title: "دوره تکنیک‌های مطالعه",
    description: "یادگیری روش‌های صحیح مطالعه و افزایش بازدهی",
    price: 800000,
    duration: "3 ماه",
    isFree: false,
    image: "/study-techniques-collage.png",
  },
]

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "چگونه برنامه‌ریزی موثر داشته باشیم؟",
    excerpt: "نکات کلیدی برای برنامه‌ریزی درسی موثر و موفقیت در امتحانات",
    content: "محتوای کامل مقاله...",
    date: "1403/09/15",
    author: "دکتر احمدی",
    image: "/study-planning.jpg",
  },
  {
    id: "2",
    title: "مدیریت استرس در ایام امتحانات",
    excerpt: "راهکارهای عملی برای کنترل اضطراب و استرس امتحانات",
    content: "محتوای کامل مقاله...",
    date: "1403/09/10",
    author: "دکتر محمدی",
    image: "/stress-management.png",
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    studentId: "student1",
    consultantId: "consultant1",
    date: "1403/10/05",
    time: "14:00",
    status: "confirmed",
    notes: "مشاوره برنامه‌ریزی درسی",
  },
]

export const mockPayments: Payment[] = [
  {
    id: "1",
    studentId: "student1",
    amount: 500000,
    date: "1403/09/01",
    status: "completed",
    description: "شهریه ماهانه مشاوره",
  },
]

export interface Video {
  id: string
  title: string
  description: string
  price: number
  duration: string
  thumbnail: string
  videoUrl: string
  isFree: boolean
}

export const mockVideos: Video[] = [
  {
    id: "v1",
    title: "تکنیک‌های حل سریع سوالات ریاضی",
    description: "یادگیری روش‌های سریع حل مسائل ریاضی برای کنکور",
    price: 150000,
    duration: "2 ساعت",
    thumbnail: "/math-techniques.jpg",
    videoUrl: "#",
    isFree: false,
  },
  {
    id: "v2",
    title: "روش‌های موثر حفظ مطالب",
    description: "تکنیک‌های علمی برای بهبود حافظه و یادگیری بهتر",
    price: 0,
    duration: "1.5 ساعت",
    thumbnail: "/memory-techniques.png",
    videoUrl: "#",
    isFree: true,
  },
  {
    id: "v3",
    title: "مدیریت زمان در روز امتحان",
    description: "استراتژی‌های حرفه‌ای برای مدیریت زمان در جلسه کنکور",
    price: 120000,
    duration: "1 ساعت",
    thumbnail: "/time-management-concept.png",
    videoUrl: "#",
    isFree: false,
  },
  {
    id: "v4",
    title: "روانشناسی موفقیت در کنکور",
    description: "تقویت اعتماد به نفس و کنترل استرس امتحانات",
    price: 200000,
    duration: "3 ساعت",
    thumbnail: "/success-psychology.jpg",
    videoUrl: "#",
    isFree: false,
  },
]

export const mockConsultationPlans: ConsultationPlan[] = [
  {
    id: "1",
    title: "طرح مشاوره جامع",
    description: "برنامه‌ریزی کامل با مشاور تخصصی برای کل سال تحصیلی",
    price: 5000000,
    duration: "12 ماه",
    features: ["جلسات هفتگی آنلاین", "برنامه‌ریزی اختصاصی", "پیگیری و ارزیابی مستمر", "دسترسی به تست‌های آزمایشی"],
    field: "all",
    isActive: true,
  },
  {
    id: "2",
    title: "طرح مشاوره تجربی",
    description: "مشاوره تخصصی برای دانش‌آموزان رشته تجربی",
    price: 6000000,
    duration: "12 ماه",
    features: ["جلسات اختصاصی", "برنامه درسی ویژه کنکور", "تست‌های آزمایشی ماهانه"],
    field: "experimental",
    isActive: true,
  },
  {
    id: "3",
    title: "طرح مشاوره ریاضی",
    description: "مشاوره تخصصی برای دانش‌آموزان رشته ریاضی",
    price: 5500000,
    duration: "12 ماه",
    features: ["جلسات هفتگی", "حل تمرین و تکلیف", "آزمون‌های ماهانه"],
    field: "math",
    isActive: true,
  },
]

export const mockConsultants: Consultant[] = [
  {
    id: "1",
    firstName: "محمد",
    lastName: "احمدی",
    name: "دکتر محمد احمدی",
    title: "مشاور تخصصی ریاضی و فیزیک",
    bio: "با بیش از 10 سال تجربه در آموزش و مشاوره دانش‌آموزان کنکوری",
    specialties: ["ریاضی", "فیزیک", "کنکور تجربی"],
    experience: 10,
    email: "ahmadi@example.com",
    phone: "09121234567",
    specialization: ["ریاضی", "فیزیک"],
    rating: 4.8,
    students: 24,
    isActive: true,
    joinDate: "1402/05/10",
  },
  {
    id: "2",
    firstName: "فاطمه",
    lastName: "محمدی",
    name: "دکتر فاطمه محمدی",
    title: "مشاور تخصصی زبان و ادبیات",
    bio: "کارشناس ارشد آموزش زبان انگلیسی با سابقه تدریس در مدارس نمونه",
    specialties: ["زبان انگلیسی", "ادبیات فارسی", "کنکور انسانی"],
    experience: 8,
    email: "mohammadi@example.com",
    phone: "09129876543",
    specialization: ["زبان انگلیسی", "ادبیات"],
    rating: 4.9,
    students: 31,
    isActive: true,
    joinDate: "1402/03/15",
  },
  {
    id: "3",
    firstName: "رضا",
    lastName: "کریمی",
    name: "دکتر رضا کریمی",
    title: "مشاور تخصصی علوم تجربی",
    bio: "دکترای زیست‌شناسی و مدرس آمادگی کنکور گروه تجربی",
    specialties: ["زیست‌شناسی", "شیمی", "کنکور تجربی"],
    experience: 12,
    email: "karimi@example.com",
    phone: "09127778888",
    specialization: ["زیست‌شناسی", "شیمی"],
    rating: 4.7,
    students: 28,
    isActive: true,
    joinDate: "1401/09/20",
  },
]

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "تخفیف ویژه نوروز!",
    content: "با خرید طرح‌های مشاوره تا پایان اسفند، ۲۰٪ تخفیف دریافت کنید",
    image: "/medical-exam-preparation.png",
    date: "1403/12/15",
    isActive: true,
  },
  {
    id: "2",
    title: "دوره‌های آمادگی کنکور",
    content: "ثبت نام دوره‌های آمادگی کنکور ۱۴۰۴ آغاز شد",
    image: "/study-planning.jpg",
    date: "1403/12/10",
    isActive: true,
  },
]

export const mockStudents: Student[] = [
  {
    id: "1",
    firstName: "علی",
    lastName: "رضایی",
    email: "alireza@example.com",
    phone: "09123334444",
    field: "experimental",
    grade: 12,
    joinDate: "1403/06/15",
    consultantId: "1",
  },
  {
    id: "2",
    firstName: "مریم",
    lastName: "کریمی",
    email: "maryam@example.com",
    phone: "09125556666",
    field: "math",
    grade: 11,
    joinDate: "1403/07/20",
    consultantId: "2",
  },
]
