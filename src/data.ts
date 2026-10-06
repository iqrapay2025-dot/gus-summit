import {
  Presentation,
  BookOpen,
  Briefcase,
  Mic,
  Handshake,
  ShoppingBag,
  Gift,
  Trophy,
  Users,
  Heart,
  Moon,
  HandHeart,
  Utensils,
  Sparkles,
  BookMarked,
  Coffee,
} from "lucide-react"

export const SUBMIT_URL =
  "https://script.google.com/macros/s/AKfycbxXgTMU6ciptJza5osd32zpoy2EdLPwNJTtUQqH7eXDoQM3SlS2TW1g_Nzn9YXU8anY/exec"

export const EVENT = {
  name: "GUS Muslimah Business Summit 2.0",
  date: "Date: To Be Announced",
  time: "Time: To Be Announced",
  venue: "Venue: To Be Announced",
  venueShort: "To Be Announced",
}

export const CONTACT = {
  whatsapp: "https://wa.me/2349071107564",
  whatsappGroup:
    "https://chat.whatsapp.com/FvzkDOmdTKfHdbwfedTDW3?s=cl&p=a&ilr=4",
  whatsappLabel: "+234 (0) 907 110 7564",
  email: "globalunitedsisters2025@gmail.com",
  instagram: "https://www.instagram.com/global_united_sisters/",
}

export const BANK = {
  bank: "GTBank",
  number: "0750312746",
  name: "Aminah Anike Folarin",
}

export type Pkg = "Nūr" | "Khayr"
export const PACKAGES: {
  id: Pkg
  price: number
  blurb: string
  perks: string[]
  tint: string
  accent: string
}[] = [
  {
    id: "Nūr",
    price: 5000,
    blurb: "Everything you need for a full day of learning and sisterhood.",
    perks: [
      "Full summit access",
      "All sessions and pitch session",
      "Meal of your choice",
      "Networking and partner exhibition",
      "Digital ticket by email",
    ],
    tint: "bg-gus-mint",
    accent: "bg-gus-green text-white",
  },
  {
    id: "Khayr",
    price: 7000,
    blurb: "The full experience, plus a keepsake made just for you.",
    perks: [
      "Everything in Nūr",
      "Personalized souvenir frame",
      "Your name or wording on the frame",
      "Optional colour customization",
      "Meal of your choice",
    ],
    tint: "bg-gus-peach",
    accent: "bg-gus-orange text-white",
  },
]
export const MEALS = ["Jollof Rice", "Ofada Rice", "Pounded Yam"]
export const naira = (n: number) => "₦" + n.toLocaleString("en-NG")

export const EXPECT = [
  {
    t: "Inspiring & Practical Sessions",
    Icon: Presentation,
    badge: "bg-gus-orange",
    card: "bg-gus-peach",
    bar: "bg-gus-orange",
  },
  {
    t: "Lessons from the Sahabiyyat",
    Icon: BookOpen,
    badge: "bg-gus-green",
    card: "bg-gus-mint",
    bar: "bg-gus-green",
  },
  {
    t: "Business & Entrepreneurship Insights",
    Icon: Briefcase,
    badge: "bg-gus-orange",
    card: "bg-gus-peach",
    bar: "bg-gus-orange",
  },
  {
    t: "Business Pitch Session",
    Icon: Mic,
    badge: "bg-red-600",
    card: "bg-gus-blush",
    bar: "bg-red-600",
  },
  {
    t: "Connect with Intentional Brands",
    Icon: Handshake,
    badge: "bg-gus-yellow !text-gus-black",
    card: "bg-amber-50",
    bar: "bg-gus-yellow",
  },
  {
    t: "Partner Sales & Exhibition Space",
    Icon: ShoppingBag,
    badge: "bg-gus-green",
    card: "bg-gus-mint",
    bar: "bg-gus-green",
  },
  {
    t: "Exclusive Partner Offers",
    Icon: Gift,
    badge: "bg-gus-orange",
    card: "bg-gus-peach",
    bar: "bg-gus-orange",
  },
  {
    t: "Awards & Recognition",
    Icon: Trophy,
    badge: "bg-gus-green",
    card: "bg-gus-mint",
    bar: "bg-gus-green",
  },
  {
    t: "Networking & Sisterhood",
    Icon: Users,
    badge: "bg-red-600",
    card: "bg-gus-blush",
    bar: "bg-red-600",
  },
]

export const DONE = [
  { t: "Business and Entrepreneurship Summits", Icon: Briefcase },
  { t: "Sisters' Hangouts", Icon: Coffee },
  { t: "Outreach Programmes", Icon: HandHeart },
  { t: "Ramadan Iftar Program", Icon: Moon },
  { t: "Empowerment Program", Icon: Sparkles },
  { t: "Charity and Welfare Initiatives", Icon: Heart },
  { t: "Qur'an and Tajweed Improvement Programs", Icon: BookMarked },
  { t: "And more, in sha Allah", Icon: Utensils },
]

export const TESTIMONIALS = [
  {
    q: "The summit was value packed and amazing. I haven't attended any summit like this.",
    by: "Aisha B.",
  },
  {
    q: "A truly impactful and well-organized program. The session was timely, insightful, and very relevant to our realities as Muslim women balancing deen, studies, and livelihood.",
    by: "Neeyah-Bee Modest Wears",
  },
  {
    q: "I met amazing people, learnt amazing things and most importantly had a great day while learning so much.",
    by: "Zainab, Posh",
  },
  {
    q: "I'm still buzzing from the amazing energy at the summit today. You gave us so much value!",
    by: "Aisha A.",
  },
  {
    q: "I hope to see more of events organized by you. You are a gem!",
    by: "Fatimah J.",
  },
]
