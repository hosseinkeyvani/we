# 📍 لیست کامل مسیرهای روتر پروژه (Next.js App Router)

**پروژه:** https://github.com/hosseinkeyvani/we  
**تعداد کل مسیرها:** ۳۴ مسیر  
**نوع روتر:** App Router (Next.js 16)  
**API Route:** ندارد  
**Route Group:** `(public)` فقط برای layout است و روی URL تأثیری ندارد

---

## ۱. مسیرهای عمومی (Public) — ۱۱ مسیر
بدون نیاز به لاگین در دسترس هستند.

| مسیر                  | توضیح مختصر              | فایل مربوطه                  |
|-----------------------|--------------------------|------------------------------|
| `/`                   | صفحه اصلی (هوم)         | `app/page.tsx`               |
| `/about`              | درباره ما               | `app/about/page.tsx`         |
| `/appointments`       | نوبت‌دهی / قرارها       | `app/appointments/page.tsx`  |
| `/auth`               | صفحه ورود / ثبت‌نام     | `app/auth/page.tsx`          |
| `/cart`               | سبد خرید                 | `app/cart/page.tsx`          |
| `/contact`            | تماس با ما               | `app/contact/page.tsx`       |
| `/courses`            | لیست دوره‌ها             | `app/courses/page.tsx`       |
| `/my-courses`         | دوره‌های من              | `app/my-courses/page.tsx`    |
| `/payment`            | صفحه پرداخت              | `app/payment/page.tsx`       |
| `/services`           | خدمات                    | `app/services/page.tsx`      |
| `/watch/[id]`         | تماشای ویدیو (دینامیک) | `app/watch/[id]/page.tsx`    |

---

## ۲. مسیرهای داشبورد (Protected) — ۲۳ مسیر
همه زیر `/dashboard` و نیاز به احراز هویت + نقش خاص دارند.

### layout اصلی داشبورد
- `/dashboard` → layout مشترک همه داشبوردها (`app/dashboard/layout.tsx`)

### نقش Admin — ۸ مسیر
| مسیر                          | توضیح                  |
|-------------------------------|------------------------|
| `/dashboard/admin`            | پنل اصلی ادمین        |
| `/dashboard/admin/appointments` | مدیریت نوبت‌ها       |
| `/dashboard/admin/consultants`| مدیریت مشاوران        |
| `/dashboard/admin/news`       | مدیریت اخبار          |
| `/dashboard/admin/plans`      | مدیریت پلن‌ها         |
| `/dashboard/admin/profile`    | پروفایل ادمین         |
| `/dashboard/admin/students`   | مدیریت دانش‌آموزان    |
| `/dashboard/admin/videos`     | مدیریت ویدیوها       |

### نقش Consultant (مشاور) — ۷ مسیر
| مسیر                              | توضیح                     |
|-----------------------------------|---------------------------|
| `/dashboard/consultant`           | پنل اصلی مشاور           |
| `/dashboard/consultant/appointments` | نوبت‌های من             |
| `/dashboard/consultant/assignments` | تکالیف                   |
| `/dashboard/consultant/payments`  | پرداخت‌ها                |
| `/dashboard/consultant/planning`  | برنامه‌ریزی              |
| `/dashboard/consultant/profile`   | پروفایل مشاور            |
| `/dashboard/consultant/students`  | دانش‌آموزان من           |

### نقش Student (دانش‌آموز) — ۷ مسیر
| مسیر                            | توضیح                     |
|---------------------------------|---------------------------|
| `/dashboard/student`            | پنل اصلی دانش‌آموز       |
| `/dashboard/student/appointments` | نوبت‌های من             |
| `/dashboard/student/assignments` | تکالیف من               |
| `/dashboard/student/payments`   | پرداخت‌ها                |
| `/dashboard/student/profile`    | پروفایل                  |
| `/dashboard/student/schedule`   | برنامه هفتگی             |
| `/dashboard/student/tests`      | آزمون‌ها                  |

---

**نکات اضافی:**
- بعضی صفحات `loading.tsx` دارند (مثل appointments و admin/students).
- تمام مسیرهای داشبورد از `app/dashboard/layout.tsx` ارث‌بری می‌کنند.
- مسیر `/watch/[id]` تنها مسیر دینامیک است.

---

تهیه شده توسط Grok برای پروژه hosseinkeyvani/we  
تاریخ: ۲۰ فوریه ۲۰۲۶
