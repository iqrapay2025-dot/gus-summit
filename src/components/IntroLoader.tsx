import { useEffect, useState } from "react"
import gusLogo from "../assets/gus-logo.png"
import "./IntroLoader.css"

const SESSION_KEY = "gus-intro-loader-seen-v1"
const SEQUENCE_DURATION = 3300
const REDUCED_SEQUENCE_DURATION = 1000
const EXIT_DURATION = 350

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true"
  } catch {
    return false
  }
}

export default function IntroLoader() {
  const [visible, setVisible] = useState(() => !hasSeenIntro())
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!visible) return

    try {
      sessionStorage.setItem(SESSION_KEY, "true")
    } catch {
      // The intro still runs when session storage is unavailable.
    }

    let cancelled = false
    let minimumTimer = 0
    let exitTimer = 0
    let loadHandler: (() => void) | undefined

    const minimumDuration = new Promise<void>((resolve) => {
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? REDUCED_SEQUENCE_DURATION
        : SEQUENCE_DURATION
      minimumTimer = window.setTimeout(resolve, duration)
    })

    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve()
        return
      }
      loadHandler = () => resolve()
      window.addEventListener("load", loadHandler, { once: true })
    })

    const fontsReady =
      document.fonts?.ready.then(
        () => undefined,
        () => undefined,
      ) ?? Promise.resolve()

    Promise.all([minimumDuration, pageLoaded, fontsReady]).then(() => {
      if (cancelled) return
      setExiting(true)
      exitTimer = window.setTimeout(() => {
        if (!cancelled) setVisible(false)
      }, EXIT_DURATION)
    })

    return () => {
      cancelled = true
      window.clearTimeout(minimumTimer)
      window.clearTimeout(exitTimer)
      if (loadHandler) window.removeEventListener("load", loadHandler)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className={`gus-intro${exiting ? " gus-intro--exiting" : ""}`}
      aria-hidden="true"
    >
      <div className="gus-intro__row">
        <span className="gus-intro__mark-enter">
          <img className="gus-intro__mark-spin" src={gusLogo} alt="" />
        </span>
        <div className="gus-intro__copy">
          <span className="gus-intro__title">GLOBAL UNITED SISTERS</span>
          <span className="gus-intro__tagline">ENLIGHTEN, POWER &amp; SUPPORT</span>
        </div>
      </div>
      <span className="gus-intro__accent" />
    </div>
  )
}