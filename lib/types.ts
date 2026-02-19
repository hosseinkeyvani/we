export interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  isFree: boolean
  image: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  image: string
}

export interface Appointment {
  id: string
  studentId: string
  consultantId: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
}

export interface Payment {
  id: string
  studentId: string
  amount: number
  date: string
  status: "pending" | "completed" | "failed"
  description: string
}

export interface WeeklySchedule {
  id: string
  studentId: string
  day: string
  tasks: ScheduleTask[]
}

export interface ScheduleTask {
  id: string
  time: string
  subject: string
  description: string
  completed: boolean
}

export interface Assignment {
  id: string
  studentId: string
  title: string
  description: string
  dueDate: string
  submitted: boolean
  submittedDate?: string
  feedback?: string
}

export interface ConsultationPlan {
  id: string
  title: string
  description: string
  price: number
  duration: string
  features: string[]
  field: "math" | "experimental" | "humanities" | "all"
  isActive: boolean
}

export interface Consultant {
  id: string
  firstName: string
  lastName: string
  name: string
  title: string
  bio: string
  specialties: string[]
  experience: number
  email: string
  phone: string
  specialization: string[]
  rating: number
  students: number
  isActive: boolean
  joinDate: string
}

export interface NewsItem {
  id: string
  title: string
  content: string
  image: string
  date: string
  isActive: boolean
}

export interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  field: "math" | "experimental" | "humanities"
  grade: number
  joinDate: string
  consultantId?: string
}
