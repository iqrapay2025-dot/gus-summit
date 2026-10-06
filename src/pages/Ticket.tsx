import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import QRCode from 'qrcode'
import { toPng } from 'html-to-image'
import { Download } from 'lucide-react'
import { Container, Logo, LinkButton, Button } from '../components/ui'
import { EVENT } from '../data'

type T = { ticketId: string; fullName: string; package: string; meal: string; frameWording: string; colour: string }

export default function Ticket() {
  const { state } = useLocation()
  const [t] = useState<T | null>(() => {
    if (state) return state as T
    try { return JSON.parse(sessionStorage.getItem('gus-ticket') || 'null') } catch { return null }
  })
  const [qr, setQr] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (t) QRCode.toDataURL(t.ticketId, { width: 320, margin: 1, color: { dark: '#111111', light: '#ffffff' } }).then(setQr) }, [t])

  async function download() {
    if (!ref.current || !t) return
    setSaving(true)
    try {
      const url = await toPng(ref.current, { pixelRatio: 2, backgroundColor: '#ffffff' })
      const a = document.createElement('a'); a.href = url; a.download = `${t.ticketId}-GUS-Ticket.png`; a.click()
    } finally { setSaving(false) }
  }

  if (!t) {
    return (
      <Container className="max-w-md py-24 text-center">
        <h1 className="font-display text-3xl font-semibold text-gus-orange">No ticket yet</h1>
        <p className="mb-6 mt-2">Complete your registration to receive your ticket.</p>
        <LinkButton to="/register">Register</LinkButton>
      </Container>
    )
  }
  const rows: [string, string][] = [['Package', t.package], ['Meal', t.meal]]
  if (t.package === 'Khayr') { rows.push(['Souvenir wording', t.frameWording]); rows.push(['Frame colour', t.colour || 'Standard']) }

  return (
    <section className="bg-gus-cream py-10 sm:py-16">
      <Container className="max-w-md">
        <h1 className="fade-up text-center font-display text-3xl font-semibold text-gus-green sm:text-4xl">Registration complete, Alhamdulillah! 🎉</h1>
        <div ref={ref} className="fade-up mt-8 overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="bg-gradient-to-r from-gus-orange to-gus-yellow p-5">
            <div className="rounded-2xl bg-white/95 p-3"><Logo size={40} /></div>
            <p className="mt-4 font-accent text-xl font-bold text-black">{EVENT.name}</p>
          </div>
          <div className="space-y-4 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gus-green">Attendee</p>
              <p className="font-display text-2xl font-semibold leading-tight">{t.fullName}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              {rows.map(([k, v]) => <div key={k}><dt className="text-xs font-semibold uppercase tracking-widest text-gus-green">{k}</dt><dd className="font-semibold">{v}</dd></div>)}
              <div><dt className="text-xs font-semibold uppercase tracking-widest text-gus-green">Date &amp; time</dt><dd className="font-semibold">To Be Announced</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-widest text-gus-green">Venue</dt><dd className="font-semibold">{EVENT.venueShort}</dd></div>
            </dl>
          </div>
          <div className="relative border-t-2 border-dashed border-black/25">
            <span className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-gus-cream" aria-hidden />
            <span className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-gus-cream" aria-hidden />
            <div className="flex items-center justify-between gap-4 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gus-green">Ticket ID</p>
                <p className="font-display text-2xl font-semibold text-gus-orange">{t.ticketId}</p>
              </div>
              {qr && <img src={qr} alt={`QR code for ticket ${t.ticketId}`} className="h-28 w-28 rounded-xl border-4 border-gus-green" />}
            </div>
            <div className="h-2 bg-gus-green" />
          </div>
        </div>
        <p className="mt-6 text-center text-sm leading-relaxed">A copy has been sent to your email. Your payment receipt is being verified.</p>
        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={download} disabled={saving || !qr}><Download className="h-5 w-5" /> {saving ? 'Preparing…' : 'Download Ticket'}</Button>
          <Link to="/" className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-black bg-white font-display font-semibold hover:bg-black hover:text-white">Back to Home</Link>
        </div>
      </Container>
    </section>
  )
}
