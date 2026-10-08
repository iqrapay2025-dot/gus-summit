import iqrapay from "../assets/iqrapay-logo.png"
import { useEffect, useState, useCallback } from "react"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Quote,
  ImageIcon,
  ArrowUpRight,
} from "lucide-react"
import { Container, SectionHeading, LinkButton, Photo, IMG } from "./ui"
import { EXPECT, PACKAGES, TESTIMONIALS, naira, MEALS } from "../data"

export function ExpectGrid({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 bg-[#fbf8f5] py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="The summit experience"
          title={
            <>
              What to <span className="text-gus-orange">expect</span>
            </>
          }
        />
        <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {EXPECT.map(({ t, Icon, badge, card, bar }, i) => (
            <li
              key={t}
              className={`${card} group relative flex flex-col items-center rounded-[28px] px-6 pb-7 pt-10 text-center transition hover:-translate-y-1 hover:shadow-lg`}
            >
              <span className="absolute left-4 top-3 font-display text-sm font-semibold text-black/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`${badge} grid h-16 w-16 place-items-center rounded-full text-white shadow-md ring-4 ring-white`}
              >
                <Icon className="h-8 w-8" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold leading-tight">
                {t}
              </h3>
              <span
                className={`${bar} mt-4 h-1.5 w-12 rounded-full transition-all group-hover:w-20`}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function PackagesPreview({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="bg-gus-cream py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Choose your seat"
          title={
            <>
              Summit <span className="text-gus-green">packages</span>
            </>
          }
          sub="Both packages include your choice of meal: Jollof Rice, Ofada Rice or Pounded Yam."
        />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {PACKAGES.map((p) => (
            <article
              key={p.id}
              className={`${p.tint} relative flex flex-col rounded-[28px] p-7 shadow-sm ${
                p.id === "Khayr" ? "ring-4 ring-gus-yellow" : ""
              }`}
            >
              {p.id === "Khayr" && (
                <span className="absolute -top-4 right-6 rounded-full bg-gus-yellow px-4 py-1 font-accent text-sm font-semibold">
                  Most memorable
                </span>
              )}
              <span
                className={`${p.accent} w-fit rounded-full px-4 py-1 font-accent text-sm font-semibold uppercase tracking-wide`}
              >
                {p.id} Package
              </span>
              <p className="mt-4 font-display text-5xl font-semibold text-gus-orange">
                {naira(p.price)}
              </p>
              <p className="mt-2 text-black/75">{p.blurb}</p>
              {detailed && (
                <ul className="mt-5 space-y-2">
                  {p.perks.map((x) => (
                    <li key={x} className="flex gap-2">
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-gus-green"
                        aria-hidden
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
              {detailed && (
                <p className="mt-5 text-sm font-medium text-black/70">
                  Meals: {MEALS.join(" · ")}
                </p>
              )}
              <LinkButton
                to={`/register?package=${encodeURIComponent(p.id)}`}
                className="mt-7 w-full"
              >
                Register for {p.id}
              </LinkButton>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIALS.length
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n])
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 6500)
    return () => clearInterval(t)
  }, [paused, go])
  return (
    <section
      className="bg-gus-deep py-16 sm:py-24"
      aria-roledescription="carousel"
      aria-label="Summit 1.0 testimonials"
    >
      <Container>
        <SectionHeading
          light
          eyebrow="Summit 1.0 voices"
          title={
            <>
              Sisters <span className="text-gus-yellow">said it best</span>
            </>
          }
        />
        <div
          className="mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-[32px]">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {TESTIMONIALS.map((t, k) => (
                <figure
                  key={k}
                  className="w-full shrink-0 p-1"
                  aria-hidden={k !== i}
                  role="group"
                  aria-label={`${k + 1} of ${n}`}
                >
                  <div className="flex min-h-[260px] flex-col justify-between rounded-[28px] bg-white p-7 shadow-md sm:p-10">
                    <Quote
                      className="h-10 w-10 fill-gus-orange text-gus-orange"
                      aria-hidden
                    />
                    <blockquote className="my-5 text-lg font-medium leading-relaxed sm:text-xl">
                      &ldquo;{t.q}&rdquo;
                    </blockquote>
                    <figcaption className="font-accent text-lg font-semibold text-gus-green">
                      &mdash; {t.by}
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full bg-white shadow hover:bg-gus-yellow"
            >
              <ChevronLeft />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Go to testimonial ${k + 1}`}
                  aria-current={k === i}
                  className={`h-3 rounded-full transition-all ${
                    k === i ? "w-8 bg-gus-orange" : "w-3 bg-black/25"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full bg-white shadow hover:bg-gus-yellow"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

const PARTNERS = [
  {
    name: "IqraPay",
    logo: iqrapay,
    href: "https://iqrapay.com.ng",
    label: "iqrapay.com.ng",
  },
]

import before from "../imports/before.jpg"
import bish from "../imports/bish.jpg"
import blissHaven from "../imports/bliss haven.jpg"
import bolan from "../imports/bolan.jpg"
import deejah from "../imports/deejah.jpg"
import gentle from "../imports/gentle.jpg"
import modesty from "../imports/modesty.jpg"
import mujaahidah from "../imports/mujaahidah.jpg"
import scentique from "../imports/Scentique.jpg"
import tastyTales from "../imports/tastytales.jpg"
import tawakkul from "../imports/tawakkul.jpg"
import vantage from "../imports/vantage.jpg"
import yussrah from "../imports/yussrah.jpg"

const NAMED_PARTNERS = [
  {
    name: "Before You Fall in Love",
    logo: before,
    fit: "object-cover object-[50%_55%]",
    href: "https://wa.me/message/GPUXPD4KGZSIO1",
  },
  {
    name: "Bish Creative",
    logo: bish,
    fit: "object-cover scale-[1.6]",
    href: "https://wa.me/2349136373167",
  },
  {
    name: "Bliss Haven",
    logo: blissHaven,
    fit: "object-contain",
    href: "https://bit.ly/Bliss_Haven",
  },
  {
    name: "Bolan's Bites",
    logo: bolan,
    fit: "object-contain",
    href: "https://wa.me/2349044100543",
  },
  {
    name: "Deejah's Kitchen",
    logo: deejah,
    fit: "object-contain",
    href: "https://wa.me/message/7JNU3BQSFY33E1",
  },
  {
    name: "The Gentle Crochet",
    logo: gentle,
    fit: "object-contain",
    href: "https://wa.me/message/X6N5AYRGT7VRP1",
  },
  {
    name: "Modesty with Yusroh",
    logo: modesty,
    fit: "object-contain",
    href: "https://wa.me/2347065964448",
  },
  {
    name: "Mujaahidah Consulting",
    logo: mujaahidah,
    fit: "object-contain",
    href: "https://shorturl.at/e7yGd",
  },
  { name: "Scentique", logo: scentique, fit: "object-contain" },
  {
    name: "Tasty Tales",
    logo: tastyTales,
    fit: "object-contain",
    href: "https://wa.link/krt0s5",
  },
  {
    name: "Tawakkul",
    logo: tawakkul,
    fit: "object-contain",
    href: "https://wa.link/ymardk",
  },
  {
    name: "Vantage Health and Wellness Hub",
    logo: vantage,
    fit: "object-contain",
  },
  {
    name: "Yussrah",
    logo: yussrah,
    fit: "object-contain",
    href: "https://wa.me/2347065964448",
  },
]

export function PartnersStrip({ link = true }: { link?: boolean }) {
  return (
    <section className="bg-[#fbf8f5] py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Walking with us"
          title="Our Partners"
          sub="Brands walking with us to empower the Muslimah."
        />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name}, visit ${p.label}`}
                className="group relative grid aspect-[3/2] place-items-center overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md before:absolute before:inset-0 before:translate-y-full before:bg-gus-deep/90 before:transition-transform before:duration-300 hover:before:translate-y-0 focus-visible:before:translate-y-0"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="relative max-h-full w-auto object-contain transition duration-300 group-hover:scale-90 group-hover:opacity-20"
                />
                <span className="absolute inset-0 z-10 flex translate-y-3 flex-col items-center justify-center gap-1 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <ArrowUpRight
                    className="h-6 w-6 text-gus-yellow"
                    aria-hidden
                  />
                  <span className="text-sm font-semibold">{p.name}</span>
                </span>
              </a>
            </li>
          ))}
          {NAMED_PARTNERS.map((p) => (
            <li
              key={p.name}
              className="group relative aspect-[3/2] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                className={`relative h-full w-full ${p.fit} transition duration-300 group-hover:scale-90 group-hover:opacity-20`}
              />
              <span className="absolute inset-0 z-10 flex translate-y-3 flex-col items-center justify-center gap-1 bg-gus-deep/90 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {p.href && (
                  <ArrowUpRight
                    className="h-6 w-6 text-gus-yellow"
                    aria-hidden
                  />
                )}
                <span className="text-center text-sm font-semibold">
                  {p.name}
                </span>
              </span>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${p.name}`}
                  className="absolute inset-0 z-20 rounded-2xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-gus-orange"
                />
              )}
            </li>
          ))}
        </ul>
        {link && (
          <div className="mt-8 text-center">
            <LinkButton to="/summit#partners" variant="outline">
              Become a partner
            </LinkButton>
          </div>
        )}
      </Container>
    </section>
  )
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-gus-deep py-16 text-center text-white sm:py-24">
      <Photo
        id={IMG.group}
        alt=""
        w={1400}
        h={700}
        className="absolute inset-0 h-full w-full opacity-25"
      />
      <div
        className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gus-orange/30"
        aria-hidden
      />
      <div
        className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-gus-yellow/25"
        aria-hidden
      />
      <Container className="relative">
        <h2 className="font-display text-3xl font-semibold leading-tight sm:text-6xl">
          Align your hustle{" "}
          <span className="text-gus-yellow">with barakah.</span>
        </h2>
        <p className="mt-4 font-accent text-2xl text-gus-orange sm:text-3xl">
          Secure your seat.
        </p>
        <LinkButton to="/register" className="mt-8 !bg-gus-yellow !text-black">
          Register Now
        </LinkButton>
      </Container>
    </section>
  )
}
