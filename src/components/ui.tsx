import { Link } from 'react-router'
import type { ReactNode, ComponentProps } from 'react'
import logo from '../assets/gus-logo.png'

export function Logo({ dark = false, size = 48 }: { dark?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-3">
      <img src={logo} alt="GUS emblem" width={size} height={size} className="object-contain" style={{ width: size, height: size }} />
      <span className="leading-none">
        <span className={`block font-display text-[15px] font-semibold tracking-tight sm:text-lg ${dark ? 'text-gus-yellow' : 'text-gus-green'}`}>GLOBAL UNITED SISTERS</span>
        <span className={`mt-1 block text-[9px] font-semibold tracking-[0.18em] sm:text-[10px] ${dark ? 'text-white' : 'text-gus-black'}`}>ENLIGHTEN, POWER &amp; SUPPORT</span>
      </span>
    </span>
  )
}

const base = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 font-display text-base font-semibold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60'
const variants = {
  primary: 'bg-gus-orange text-black hover:bg-gus-yellow shadow-md hover:shadow-lg',
  outline: 'border-2 border-gus-black bg-white/70 text-gus-black hover:bg-gus-black hover:text-white',
  green: 'bg-gus-green text-white hover:bg-gus-black',
  dark: 'bg-gus-deep text-white hover:bg-gus-orange hover:text-black',
}
type V = keyof typeof variants

export function LinkButton({ to, variant = 'primary', className = '', ...p }: { to: string; variant?: V } & Omit<ComponentProps<typeof Link>, 'to'>) {
  return <Link to={to} className={`${base} ${variants[variant]} ${className}`} {...p} />
}
export function Button({ variant = 'primary', className = '', ...p }: { variant?: V } & ComponentProps<'button'>) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...p} />
}
export function ExtButton({ variant = 'primary', className = '', ...p }: { variant?: V } & ComponentProps<'a'>) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...p} />
}

export function SectionHeading({ eyebrow, title, sub, center = true, light = false }: { eyebrow?: string; title: ReactNode; sub?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`mb-10 sm:mb-14 ${center ? 'text-center' : ''}`}>
      <span className={`mb-5 block h-0.5 w-14 ${center ? 'mx-auto' : ''} ${light ? 'bg-gus-yellow' : 'bg-gus-orange'}`} aria-hidden />
      {eyebrow && <p className={`mb-3 text-sm font-medium uppercase tracking-[0.18em] ${light ? 'text-gus-yellow' : 'text-gus-green'}`}>{eyebrow}</p>}
      <h2 className={`font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl ${light ? 'text-white' : 'text-gus-deep'}`}>{title}</h2>
      {sub && <p className={`mt-4 max-w-2xl text-lg ${center ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-gus-black/70'}`}>{sub}</p>}
    </div>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function Leaf({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 300" aria-hidden className={`pointer-events-none absolute ${className}`} style={style}>
      <path d="M100 295 C100 200 98 120 100 10" stroke="#2F7A2B" strokeWidth="5" fill="none" />
      {[...Array(7)].map((_, i) => {
        const y = 40 + i * 36
        return (
          <g key={i}>
            <path d={`M100 ${y + 30} C60 ${y + 10} 20 ${y + 20} 6 ${y + 52} C50 ${y + 56} 85 ${y + 50} 100 ${y + 30}Z`} fill={i % 2 ? '#3d9a38' : '#2F7A2B'} />
            <path d={`M100 ${y + 30} C140 ${y + 10} 180 ${y + 20} 194 ${y + 52} C150 ${y + 56} 115 ${y + 50} 100 ${y + 30}Z`} fill={i % 2 ? '#2F7A2B' : '#3d9a38'} />
          </g>
        )
      })}
    </svg>
  )
}

export function Cloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" aria-hidden className={`pointer-events-none absolute fill-white ${className}`}>
      <circle cx="50" cy="50" r="28" /><circle cx="90" cy="38" r="34" /><circle cx="135" cy="48" r="28" /><rect x="30" y="50" width="130" height="28" rx="14" />
    </svg>
  )
}

export const InstagramIcon = (p: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
)
export const WhatsAppIcon = (p: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.500-.7-1.700-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.1 0-.3 0-.4l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.200 5.200 5.200 0 0 0 1.100 2.800 11.900 11.900 0 0 0 4.600 4c1.700.7 2.400.8 3.200.7a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.6-.3Z" />
  </svg>
)

import g1 from '../assets/photos/gus-8.jpg'
import g2 from '../assets/photos/gus-2.jpg'
import g3 from '../assets/photos/gus-3.jpg'
import g4 from '../assets/photos/gus-4.jpg'
import g5 from '../assets/photos/gus-5.jpg'
import g6 from '../assets/photos/gus-6.jpg'
import g7 from '../assets/photos/gus-7.jpg'

export const IMG = { five: g1, table: g2, trio: g3, white: g4, scarves: g5, phone: g1, group: g4, hall: g6, tables: g7 }
export function Photo({ id, alt, w = 800, h = 600, className = '', eager = false }: { id: string; alt: string; w?: number; h?: number; className?: string; eager?: boolean }) {
  return <img src={id} alt={alt} width={w} height={h} loading={eager ? 'eager' : 'lazy'} decoding="async" className={`bg-gus-peach object-cover ${className}`} />
}

export function PageHero({ image, pos = 'object-center', children }: { image: string; pos?: string; children: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-gus-deep text-white">
      <Photo id={image} alt="" w={1600} h={800} eager className={`absolute inset-0 -z-20 h-full w-full ${pos}`} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gus-deep/95 via-gus-deep/70 to-gus-deep/20" aria-hidden />
      <Container className="py-20 sm:py-32">{children}</Container>
    </section>
  )
}
