import { Mail } from 'lucide-react'
import { Container, SectionHeading, ExtButton, InstagramIcon, WhatsAppIcon } from '../components/ui'
import { CONTACT } from '../data'

export default function Contact() {
  const items = [
    { t: 'WhatsApp', d: CONTACT.whatsappLabel, href: CONTACT.whatsapp, Icon: WhatsAppIcon, card: 'bg-gus-mint', badge: 'bg-gus-green', cta: 'Chat with us' },
    { t: 'Email', d: CONTACT.email, href: `mailto:${CONTACT.email}`, Icon: Mail, card: 'bg-gus-peach', badge: 'bg-gus-orange', cta: 'Send an email' },
    { t: 'Instagram', d: '@global_united_sisters', href: CONTACT.instagram, Icon: InstagramIcon, card: 'bg-gus-blush', badge: 'bg-red-600', cta: 'Follow GUS' },
  ]
  return (
    <section className="bg-gus-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="We'd love to hear from you" title="Contact us" sub="Questions about registration, partnership or the summit? Reach out, sister." />
        <div className="relative mb-8 flex h-52 w-full items-center justify-center gap-6 overflow-hidden rounded-[32px] bg-gradient-to-br from-gus-yellow via-gus-orange to-gus-orange-dark shadow-lg sm:h-72 sm:gap-12" role="img" aria-label="A mobile phone with chat messages">
          <span className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-white/10" aria-hidden />
          <span className="absolute -bottom-14 right-10 h-56 w-56 rounded-full bg-white/10" aria-hidden />
          <div className="relative hidden -rotate-6 flex-col gap-3 sm:flex" aria-hidden>
            <span className="rounded-2xl rounded-bl-sm bg-white px-5 py-3 font-display text-lg font-semibold shadow-lg">Assalamu alaikum!</span>
            <span className="ml-8 rounded-2xl rounded-br-sm bg-gus-deep px-5 py-3 font-display text-lg font-semibold text-white shadow-lg">How can we help?</span>
          </div>
          <div className="relative h-[130%] w-32 shrink-0 translate-y-8 rotate-3 rounded-[2rem] border-[6px] border-gus-black bg-white p-2 shadow-2xl sm:w-40" aria-hidden>
            <span className="mx-auto block h-1.5 w-10 rounded-full bg-gus-black/80" />
            <div className="mt-3 space-y-2">
              <span className="block h-7 w-4/5 rounded-xl rounded-bl-sm bg-gus-mint" />
              <span className="ml-auto block h-7 w-3/5 rounded-xl rounded-br-sm bg-gus-orange" />
              <span className="block h-7 w-2/3 rounded-xl rounded-bl-sm bg-gus-mint" />
              <span className="ml-auto block h-7 w-4/5 rounded-xl rounded-br-sm bg-gus-orange" />
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gus-green text-white"><WhatsAppIcon className="h-5 w-5" /></span>
            </div>
          </div>
          <div className="relative hidden rotate-6 gap-3 sm:flex" aria-hidden>
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-gus-orange shadow-lg"><Mail className="h-8 w-8" /></span>
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-gus-orange shadow-lg"><InstagramIcon className="h-8 w-8" /></span>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map(({ t, d, href, Icon, card, badge, cta }) => (
            <article key={t} className={`${card} flex flex-col items-center rounded-3xl p-8 text-center`}>
              <span className={`${badge} grid h-16 w-16 place-items-center rounded-full text-white ring-4 ring-white`}><Icon className="h-8 w-8" /></span>
              <h2 className="mt-4 font-display text-2xl font-semibold">{t}</h2>
              <p className="mb-6 mt-1 break-all">{d}</p>
              <ExtButton href={href} target="_blank" rel="noreferrer" variant="dark" className="mt-auto">{cta}</ExtButton>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
