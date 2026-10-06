import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Photo, IMG } from "./ui"

const SLIDES = [
  {
    id: IMG.five,
    alt: "A teacher leading a class at the board while sisters take notes",
    pos: "object-[45%_45%]",
  },
  {
    id: IMG.table,
    alt: "Sisters listening to a speaker at a GUS gathering",
    pos: "object-[center_60%]",
  },
  {
    id: IMG.trio,
    alt: "Sisters seated at a long table during a GUS presentation",
    pos: "object-[center_55%]",
  },
  {
    id: IMG.white,
    alt: "Sisters gathered at tables at a GUS summit",
    pos: "object-[center_45%]",
  },
  {
    id: IMG.scarves,
    alt: "A GUS sisters hangout with a welcome board",
    pos: "object-[center_50%]",
  },
  {
    id: IMG.hall,
    alt: "Sisters seated at round tables in a summit hall",
    pos: "object-[center_55%]",
  },
  {
    id: IMG.tables,
    alt: "Sisters in khimar seated at tables with white flowers",
    pos: "object-[center_60%]",
  },
]

export function HeroCarousel({ children }: { children: React.ReactNode }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = SLIDES.length
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n])
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => go(1), 5500)
    return () => clearInterval(t)
  }, [paused, go])

  return (
    <section
      className="relative isolate overflow-hidden bg-gus-deep text-white"
      role="group"
      aria-roledescription="carousel"
      aria-label="GUS sisters photo gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((s, k) => (
        <div
          key={s.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${k + 1} of ${n}`}
          aria-hidden={k !== i}
          className={`absolute inset-0 -z-20 transition-opacity duration-1000 ${
            k === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <Photo
            id={s.id}
            alt={s.alt}
            w={1600}
            h={900}
            eager={k === 0}
            className={`h-full w-full transition-transform duration-[6000ms] ${
              k === i ? "scale-105" : "scale-100"
            } ${s.pos}`}
          />
        </div>
      ))}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-gus-deep/95 via-gus-deep/65 to-gus-deep/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-gus-deep/80 via-transparent to-transparent"
        aria-hidden
      />
      {children}
      <div className="absolute bottom-6 right-5 z-10 flex items-center gap-3 sm:bottom-10 sm:right-10">
        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/10 backdrop-blur hover:bg-white hover:text-black"
        >
          <ChevronLeft />
        </button>
        <div
          className="hidden gap-2 sm:flex"
          role="tablist"
          aria-label="Choose slide"
        >
          {SLIDES.map((_, k) => (
            <button
              key={k}
              role="tab"
              aria-selected={k === i}
              aria-label={`Show photo ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-2 rounded-full transition-all ${
                k === i ? "w-8 bg-gus-yellow" : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/10 backdrop-blur hover:bg-white hover:text-black"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}
