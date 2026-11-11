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
 * One banner per package, side by side: Nūr (orange) and Khayr (black).
 * Each banner shows its own price, the old price crossed out, and its own
 * countdown. A sale that is over disappears; when all are over, nothing shows.
 */
export function PromoBanner() {
  const now = useNow(1000)
  const shown = ITEMS.filter((i) => now < i.end)
  if (!shown.length) return null

  return (
    <section role="region" aria-label="Ticket flash sale">
      <div
        className={`grid ${shown.length > 1 ? "md:grid-cols-2" : ""}`}
      >
        {shown.map((i) => {
          const live = now >= i.start
          const dark = i.id === "Khayr"
          return (
            <div
              key={i.id}
              className={
                dark
                  ? "bg-black text-white"
                  : "bg-linear-to-r from-gus-orange to-gus-yellow text-black"
              }
            >
              <Container className="flex flex-col items-center gap-3 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full motion-safe:animate-pulse ${
                      dark ? "bg-gus-yellow text-black" : "bg-black text-gus-yellow"
                    }`}
                    aria-hidden
                  >
                    <Zap className="h-6 w-6" />
                  </span>
                  <div>
                    <p
                      className={`font-accent text-lg font-semibold uppercase tracking-wide ${
                        dark ? "text-gus-yellow" : ""
                      }`}
                    >
                      {i.id} flash sale {live ? "is on" : "coming"}
                    </p>
                    <p className="font-medium">
                      <b className="text-xl">{naira(i.price)}</b>{" "}
                      <span className="line-through opacity-70">
                        {naira(i.normal)}
                      </span>{" "}
                      · Save {naira(i.normal - i.price)}
                    </p>
                    <p className="text-sm opacity-80">
                      Today only, {timeLabel(i.startIso)} to{" "}
                      {timeLabel(i.endIso)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <p className="font-display text-xl font-semibold tabular-nums">
                    <span className="sr-only">
                      {live ? "The sale ends soon." : "The sale starts soon."}
                    </span>
                    <span aria-hidden>
                      {live ? "Ends in " : "Starts in "}
                      {clock((live ? i.end : i.start) - now)}
                    </span>
                  </p>
                  {live && (
                    <LinkButton
                      to={`/register?package=${encodeURIComponent(i.id)}`}
                      className={
                        dark
                          ? "bg-gus-yellow! text-black!"
                          : "bg-black! text-white!"
                      }
                    >
                      Get {i.id} {naira(i.price)}
                    </LinkButton>
                  )}
                </div>
              </Container>
            </div>
          )
        })}
      </div>
    </section>
  )
}