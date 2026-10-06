import gusLogo from "../assets/gus-logo.png"
import { Calendar, MapPin, Clock, ArrowUpRight } from "lucide-react"
import { Link } from "react-router"
import { Container, LinkButton, Photo, IMG } from "../components/ui"
import {
  ExpectGrid,
  PackagesPreview,
  Testimonials,
  PartnersStrip,
  CtaBand,
} from "../components/sections"
import { EVENT } from "../data"
import { HeroCarousel } from "../components/HeroCarousel"

export default function Home() {
  return (
    <>
      <HeroCarousel>
        <Container className="flex min-h-[620px] flex-col justify-end pb-28 pt-24 sm:min-h-[720px] sm:pb-24">
          <p className="fade-up w-fit rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            Theme: The Multifaceted Muslimah
          </p>
          <h1 className="fade-up mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight min-[400px]:text-5xl sm:text-7xl">
            Global United <span className="text-gus-orange">Sisters</span>
          </h1>
          <p className="fade-up mt-5 max-w-xl text-lg text-white/85">
            Global United Sisters (GUS) was founded with the intention of
            creating a platform where Muslim sisters can come together, learn,
            grow, connect, and positively impact one another.
          </p>
          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton to="/register">
              Register Now <ArrowUpRight className="h-5 w-5" aria-hidden />
            </LinkButton>
            <a
              href="#expect"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 px-7 py-3 font-display font-semibold hover:bg-white hover:text-black"
            >
              See What to Expect
            </a>
          </div>
          <ul className="fade-up mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              [Calendar, EVENT.date],
              [Clock, EVENT.time],
              [MapPin, EVENT.venue],
            ].map(([I, t]) => {
              const Icon = I as typeof Calendar
              return (
                <li
                  key={t as string}
                  className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 text-gus-yellow"
                    aria-hidden
                  />
                  {t as string}
                </li>
              )
            })}
          </ul>
        </Container>
      </HeroCarousel>

      <section className="bg-[#fbf8f5] py-14 sm:py-20">
        <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className="relative" data-reveal>
            <div
              className="relative grid aspect-[9/7] w-full place-items-center overflow-hidden rounded-[32px] bg-gradient-to-br from-gus-yellow via-gus-orange to-gus-orange-dark shadow-lg"
              role="img"
              aria-label="The GUS logo beside a question mark: who is GUS?"
            >
              <span
                className="absolute -right-6 -top-16 select-none font-display text-[22rem] font-bold leading-none text-white/15"
                aria-hidden
              >
                ?
              </span>
              <span
                className="absolute -bottom-10 -left-8 h-56 w-56 rounded-full bg-white/10"
                aria-hidden
              />
              <div className="relative flex items-center gap-4 sm:gap-6">
                <span className="grid h-36 w-36 place-items-center rounded-full bg-white shadow-2xl ring-8 ring-white/30 sm:h-52 sm:w-52">
                  <img
                    src={gusLogo}
                    alt=""
                    className="h-4/5 w-4/5 object-contain"
                  />
                </span>
                <span
                  className="font-display text-8xl font-bold leading-none text-white drop-shadow-lg sm:text-[9rem]"
                  aria-hidden
                >
                  ?
                </span>
              </div>
            </div>
            <span className="absolute -bottom-4 right-2 rotate-3 rounded-2xl bg-gus-yellow px-4 py-2 font-accent text-lg font-semibold shadow-md">
              Enlighten, Power &amp; Support
            </span>
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-accent text-2xl font-semibold uppercase text-gus-green">
              Who is GUS?
            </h2>
            <p className="mt-3 text-lg leading-relaxed">
              Global United Sisters is a platform where Muslim sisters come
              together to learn, grow, connect and positively impact one
              another, all for the sake of Allah.
            </p>
            <Link
              to="/about"
              className="mt-4 inline-block font-display font-semibold text-gus-orange underline underline-offset-4 hover:text-gus-green"
            >
              Learn more about GUS →
            </Link>
          </div>
        </Container>
      </section>

      <ExpectGrid id="expect" />
      <section className="bg-gus-deep py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-center font-display text-3xl font-semibold text-white sm:text-5xl">
            Moments of <span className="text-gus-yellow">sisterhood</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {[
              [
                IMG.tables,
                "Sisters in khimar seated at tables with white flowers",
              ],
              [IMG.table, "Sisters listening to a speaker"],
              [IMG.hall, "Sisters seated at round tables in a summit hall"],
              [
                IMG.trio,
                "Sisters seated at a long table during a presentation",
              ],
            ].map(([id, alt], k) => (
              <Photo
                key={id}
                id={id}
                alt={alt}
                w={500}
                h={640}
                className={`aspect-[4/5] w-full rounded-3xl object-center transition duration-500 hover:scale-[1.03] hover:rotate-1 ${
                  k % 2 ? "md:mt-8" : ""
                }`}
              />
            ))}
          </div>
        </Container>
      </section>
      <PackagesPreview />
      <Testimonials />
      <PartnersStrip />
      <CtaBand />
    </>
  )
}
