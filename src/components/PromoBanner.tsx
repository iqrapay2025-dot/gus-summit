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
              <Container className="flex items-center justify-between gap-3 py-3 sm:py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full motion-safe:animate-pulse sm:h-11 sm:w-11 ${
                      dark ? "bg-gus-yellow text-black" : "bg-black text-gus-yellow"
                    }`}
                    aria-hidden
                  >
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`font-accent text-sm font-semibold uppercase leading-tight tracking-wide sm:text-lg ${
                        dark ? "text-gus-yellow" : ""
                      }`}
                    >
                      {i.id} flash sale {live ? "is on" : "coming"}
                    </p>
                    <p className="font-medium leading-tight">
                      <b className="text-lg sm:text-xl">{naira(i.price)}</b>{" "}
                      <span className="text-sm line-through opacity-70">
                        {naira(i.normal)}
                      </span>
                    </p>
                    <p className="text-xs leading-tight opacity-80">
                      Save {naira(i.normal - i.price)} · {timeLabel(i.startIso)}{" "}
                      to {timeLabel(i.endIso)}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5 text-right">
                  <p className="font-display leading-tight tabular-nums">
                    <span className="sr-only">
                      {live ? "The sale ends soon." : "The sale starts soon."}
                    </span>
                    <span aria-hidden>
                      <span className="block text-[11px] font-medium uppercase opacity-70">
                        {live ? "Ends in" : "Starts in"}
                      </span>
                      <span className="text-base font-semibold sm:text-xl">
                        {clock((live ? i.end : i.start) - now)}
                      </span>
                    </span>
                  </p>
                  {live && (
                    <LinkButton
                      to={`/register?package=${encodeURIComponent(i.id)}`}
                      className={`px-4! py-1.5! text-sm! ${
                        dark
                          ? "bg-gus-yellow! text-black!"
                          : "bg-black! text-white!"
                      }`}
                    >
                      Register
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