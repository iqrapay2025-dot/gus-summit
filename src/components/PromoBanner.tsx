import { useEffect, useState } from "react"
import { Zap } from "lucide-react"
import { Container, LinkButton } from "./ui"
import { NUR_PROMO, PACKAGES, naira } from "../data"

const START = Date.parse(NUR_PROMO.start)
const END = Date.parse(NUR_PROMO.end)
const NORMAL = PACKAGES.find((p) => p.id === "Nūr")?.price ?? 0

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
 * Flash-sale banner for the Nūr ticket.
 * - Before the sale starts: announces it, with a countdown to the start.
 * - During the sale: shows the sale price, a countdown to the end and a button.
 * - After the sale ends: shows nothing.
 */
export function PromoBanner() {
  const now = useNow(1000)
  if (now >= END) return null

  const live = now >= START
  const day = new Date(START).toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Africa/Lagos",
  })

  return (
    <section
      role="region"
      aria-label="Nūr ticket flash sale"
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
              {live ? "Flash sale is on" : "Flash sale coming"}
            </p>
            <p className="font-medium">
              {live ? (
                <>
                  Nūr ticket now <b>{naira(NUR_PROMO.price)}</b>{" "}
                  <span className="line-through opacity-70">
                    {naira(NORMAL)}
                  </span>
                  . Today only, 10:00AM to 10:00PM.
                </>
              ) : (
                <>
                  Nūr ticket drops to <b>{naira(NUR_PROMO.price)}</b> on {day},
                  10:00AM to 10:00PM.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
          <p className="font-display text-xl font-semibold tabular-nums">
            <span className="sr-only">
              {live ? "The sale ends soon." : "The sale starts soon."}
            </span>
            <span aria-hidden>
              {live ? "Ends in " : "Starts in "}
              {clock(live ? END - now : START - now)}
            </span>
          </p>
          {live && (
            <LinkButton
              to={`/register?package=${encodeURIComponent("Nūr")}`}
              className="bg-black! text-white!"
            >
              Get my {naira(NUR_PROMO.price)} ticket
            </LinkButton>
          )}
        </div>
      </Container>
    </section>
  )
}