import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router"
import { Menu, X, ArrowUp } from "lucide-react"
import { Logo, LinkButton, Container, InstagramIcon, WhatsAppIcon } from "./ui"
import { CONTACT } from "../data"

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/summit", label: "Summit 2.0" },
  { to: "/contact", label: "Contact" },
]

export function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 600)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main section h2, main section li, main section article, main section figure, main [data-reveal]",
      ),
    ).filter(
      (el) =>
        !el.closest("form") &&
        !el.closest("[aria-roledescription=carousel] .flex"),
    )
    if (!els.length || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )
    els.forEach((el) => {
      const i = Array.from(el.parentElement?.children ?? []).indexOf(el)
      el.style.setProperty("--d", `${Math.min(i, 8) * 70}ms`)
      el.classList.add("reveal")
      io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 font-display font-semibold transition hover:bg-gus-yellow/40 ${
      isActive ? "bg-gus-deep text-white hover:bg-gus-black" : ""
    }`
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-3"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
        <Container className="flex h-[72px] items-center justify-between">
          <Link to="/" aria-label="GUS home">
            <Logo size={44} />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end className={linkCls}>
                {l.label}
              </NavLink>
            ))}
            <LinkButton to="/register" className="ml-3 !min-h-11 !py-2">
              Register
            </LinkButton>
          </nav>
          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-gus-sky md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </Container>
        {open && (
          <nav
            aria-label="Mobile"
            className="fade-up border-t border-black/5 bg-white px-5 pb-5 pt-2 md:hidden"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className={(s) => `block py-3 text-lg ${linkCls(s)}`}
              >
                {l.label}
              </NavLink>
            ))}
            <LinkButton to="/register" className="mt-3 w-full">
              Register Now
            </LinkButton>
          </nav>
        )}
      </header>
      <main id="main">
        <Outlet />
      </main>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-gus-orange text-black shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-gus-yellow ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-6 w-6" aria-hidden />
      </button>
      <footer className="bg-gus-deep text-white">
        <Container className="grid gap-10 py-14 md:grid-cols-3">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-white/75">
              Enlighten, Power &amp; Support. A home for Muslim sisters to
              learn, grow and uplift one another.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-accent text-xl text-gus-yellow">
              Quick links
            </h3>
            <ul className="space-y-2">
              {[...links, { to: "/register", label: "Register" }].map((l) => (
                <li key={l.to}>
                  <Link className="hover:text-gus-yellow" to={l.to}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-accent text-xl text-gus-yellow">
              Follow &amp; reach us
            </h3>
            <div className="flex gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="GUS on Instagram"
                className="grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-gus-orange"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="GUS on WhatsApp"
                className="grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-gus-green"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </Container>
        <div className="border-t border-white/10 py-5 text-center text-sm text-white/70">
          © 2026 Global United Sisters
        </div>
      </footer>
    </>
  )
}
