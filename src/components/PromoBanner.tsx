import { useEffect, useState } from "react"
import { Zap } from "lucide-react"
import { Container, LinkButton } from "./ui"
import { PACKAGES, PROMOS, naira, timeLabel } from "../data"

// Every package that has a sale in data.ts (PROMOS)
const ITEMS = PACKAGES.flatMap((p) => {
  const promo = PROMOS[p.id]
  return promo
    ? [
        {
          id: p.id,
          normal: p.price,
          price: promo.price,
          start: Date.parse(promo.start),
          end: Date.parse(promo.end),
          startIso: promo.start,
          endIso: promo.end,
        },
      ]
    : []
})

function useNow(ms: number) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}

function clock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d > 0 ? `${d}d ` : ""}${pad(h)}:${pad(m)}:${pad(sec)}`
}

/**
 * Flash-sale banner, driven by PROMOS in data.ts.
 * - Sales that are on: shows each sale price, with a countdown to the end.
 * - Sales still to start: announces them, with a countdown if none is on yet.
 * - When every sale is over: shows nothing.
 */
export function PromoBanner() {
  const now = useNow(1000)
  const live = ITEMS.filter((i) => now >= i.start && now < i.end)
  const upcoming = ITEMS.filter((i) => now < i.start)
  if (!live.length && !upcoming.length) return null

  const target = live.length
    ? Math.min(...live.map((i) => i.end))
    : Math.min(...upcoming.map((i) => i.start))
  const lastEnd = live.reduce((a, b) => (b.end > a.end ? b : a), live[0])
  const day = upcoming.length
    ? new Date(upcoming[0].start).toLocaleDateString("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "Africa/Lagos",
      })
    : ""
  const only = live.length === 1 ? live[0] : null

  return (
    <section
      role="region"
      aria-label="Ticket flash sale"
      className="bg-linear-to-r from-gus-orange to-gus-yellow text-black"
    >
      <Container className="flex flex-col items-center gap-3 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-gus-yellow motion-safe:animate-pulse"
            aria-hidden
          >
            <Zap className="h-6 w-6" />
          </span>
          <div>
            <p className="font-accent text-lg font-semibold uppercase tracking-wide">
              {live.length ? "Flash sale is on" : "Flash sale coming"}
            </p>
            {live.length > 0 && (
              <p className="font-medium">
                {live.map((i, k) => (
                  <span key={i.id}>
                    {k > 0 && " · "}
                    {i.id} <b>{naira(i.price)}</b>{" "}
                    <span className="line-through opacity-70">
                      {naira(i.normal)}
                    </span>
                  </span>
                ))}
                . Today only, until {timeLabel(lastEnd.endIso)}.
              </p>
            )}
            {upcoming.length > 0 && (
              <p className="font-medium">
                {upcoming.map((i, k) => (
                  <span key={i.id}>
                    {k > 0 && " · "}
                    {i.id} drops to <b>{naira(i.price)}</b>
                  </span>
                ))}
                {live.length ? " at " : ` on ${day}, from `}
                {timeLabel(upcoming[0].startIso)}.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
          <p className="font-display text-xl font-semibold tabular-nums">
            <span className="sr-only">
              {live.length ? "The sale ends soon." : "The sale starts soon."}
            </span>
            <span aria-hidden>
              {live.length ? "Ends in " : "Starts in "}
              {clock(target - now)}
            </span>
          </p>
          {live.length > 0 && (
            <LinkButton
              to={
                only
                  ? `/register?package=${encodeURIComponent(only.id)}`
                  : "/register"
              }
              className="bg-black! text-white!"
            >
              {only ? `Get my ${naira(only.price)} ticket` : "Get my ticket"}
            </LinkButton>
          )}
        </div>
      </Container>
    </section>
  )
}