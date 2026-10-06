import { Calendar, Clock, MapPin, Handshake, ShoppingBag, Gift } from 'lucide-react'
import { Container, SectionHeading, LinkButton, ExtButton, InstagramIcon, Photo, IMG, PageHero } from '../components/ui'
import { ExpectGrid, PackagesPreview, PartnersStrip, CtaBand } from '../components/sections'
import { EVENT, CONTACT } from '../data'

const PROGRAM = [
  { time: '00:00', title: 'Session title (placeholder)', speaker: 'Speaker to be announced', desc: 'Short description of the session will appear here once the program is released.' },
  { time: '00:00', title: 'Session title (placeholder)', speaker: 'Speaker to be announced', desc: 'Short description of the session will appear here once the program is released.' },
  { time: '00:00', title: 'Session title (placeholder)', speaker: 'Speaker to be announced', desc: 'Short description of the session will appear here once the program is released.' },
  { time: '00:00', title: 'Session title (placeholder)', speaker: 'Speaker to be announced', desc: 'Short description of the session will appear here once the program is released.' },
]

function TimelineItem({ time, title, speaker, desc, last }: (typeof PROGRAM)[number] & { last: boolean }) {
  return (
    <li className="relative flex gap-4 pb-8 last:pb-0 sm:gap-6">
      {!last && <span className="absolute bottom-0 left-[27px] top-14 w-0.5 bg-gus-orange/30 sm:left-[35px]" aria-hidden />}
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gus-orange font-display text-sm font-semibold text-black sm:h-[72px] sm:w-[72px]">{time}</span>
      <div className="flex-1 rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="text-sm font-semibold text-gus-green">{speaker}</p>
        <p className="mt-1 text-black/70">{desc}</p>
      </div>
    </li>
  )
}

const SPEAKERS = [
  {
    name: 'Olumoh Oluwakemi Halima',
    role: 'Founder, US Apparel & Fashion Station',
    initials: 'OH',
    topic: 'Preparing the Muslimah for her many roles..',
    points: [
      'Founder of US Apparel, a modest fashion brand',
      'B.A.Ed. in English Education, Al-Hikmah University',
      'Wife, educator, author and speaker',
      'Passionate about Muslimah development, purposeful living, personal growth, entrepreneurship, marriage and family, and empowering women to embrace diverse roles while staying grounded in faith and values',
    ],
  },
  {
    name: 'Pharm. Aroyehun Mubarakah',
    role: 'The Veiled Pharmacist, Imaamayn_Apparel',
    initials: 'AM',
    topic: 'Lessons from the women before us, the sahabiyyat.',
    points: [
      'Owner of Imaamayn_Apparel',
      'Pharmacist and superintendent pharmacist of a leading Islamic faith-based hospital in Ilorin',
      'Wife, mother and student of knowledge',
      'Values a private, purposeful life, a peaceful home, and living intentionally',
    ],
  },
]

export function SpeakerCard({ name, role, initials, topic, points }: (typeof SPEAKERS)[number]) {
  return (
    <article className="flex min-w-0 flex-col rounded-3xl bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gus-deep sm:h-20 sm:w-20 font-display text-2xl font-bold text-gus-yellow">{initials}</span>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">{name}</h3>
          <p className="break-words font-semibold text-gus-orange">{role}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-black/70">
        {points.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gus-green" />{p}</li>)}
      </ul>
      <div className="mt-6 rounded-2xl bg-gus-peach p-4">
        <p className="font-accent text-xs font-semibold uppercase tracking-wider text-gus-orange-dark">Topic</p>
        <p className="font-display text-lg font-bold leading-snug">&ldquo;{topic}&rdquo;</p>
      </div>
    </article>
  )
}

export default function Summit() {
  return (
    <>
      <PageHero image={IMG.trio} pos="object-[center_45%]">
        <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">GUS Muslimah <span className="text-gus-orange">Business Summit 2.0</span></h1>
        <p className="mt-6 font-accent text-3xl font-semibold text-gus-yellow sm:text-4xl">The Multifaceted Muslimah</p>
        <p className="mt-1 text-lg text-white/85">Preparing the Muslimah for her many roles.</p>
        <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[[Calendar, EVENT.date], [Clock, EVENT.time], [MapPin, EVENT.venue]].map(([I, t]) => {
            const Icon = I as typeof Calendar
            return <li key={t as string} className="flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur"><Icon className="h-5 w-5 text-gus-yellow" aria-hidden />{t as string}</li>
          })}
        </ul>
        <LinkButton to="/register" className="mt-8">Register Now</LinkButton>
      </PageHero>

      <section className="py-14">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <Photo id={IMG.table} alt="Sisters listening to a speaker at a GUS gathering" w={700} h={875} className="mx-auto aspect-[4/5] w-full max-w-sm rounded-[40px] border-8 border-white shadow-xl md:-rotate-2" />
          <div className="text-center md:text-left">
            <p className="font-accent text-sm font-semibold uppercase tracking-wider text-gus-orange">The Multifaceted Muslimah</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">Preparing the Muslimah for Her Many Roles</h2>
            <p className="mt-4 leading-relaxed text-black/75">The Multifaceted Muslimah focuses on the diverse roles a Muslimah may assume throughout her life, as a daughter, sister, wife, mother, entrepreneur, professional, leader, and, above all, a servant of Allah. The theme seeks to prepare Muslimahs to navigate these responsibilities with faith, wisdom, balance, and purpose, while remaining grounded in Islamic values. It is an opportunity to learn, connect, grow, and become better equipped for every role Allah has entrusted to us.</p>
          </div>
        </Container>
      </section>

      <section className="bg-gus-peach py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Program details" title="Day schedule" sub="The full program will be published soon. Here is how it will look." />
          <ol>{PROGRAM.map((p, i) => <TimelineItem key={i} {...p} last={i === PROGRAM.length - 1} />)}</ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Our lineup" title="Meet Our Speakers" sub={"Both speakers share the theme \"The Multifaceted Muslimah.\" More speakers will be announced soon."} />
          <div className="grid gap-5 md:grid-cols-2">
            {SPEAKERS.map((sp) => <SpeakerCard key={sp.name} {...sp} />)}
          </div>
          <div className="mt-8 text-center">
            <ExtButton href={CONTACT.instagram} target="_blank" rel="noreferrer" variant="outline"><InstagramIcon className="h-5 w-5" /> Follow GUS for announcements</ExtButton>
          </div>
        </Container>
      </section>

      <ExpectGrid />

      <div id="partners" className="scroll-mt-20" />
      <PartnersStrip link={false} />
      <section className="pb-16 sm:pb-24">
        <Container className="max-w-4xl">
          <div className="overflow-hidden rounded-[32px] bg-gus-yellow">
            <Photo id={IMG.phone} alt="A teacher leading a class while sisters take notes" w={1200} h={400} className="h-40 w-full object-[center_40%] sm:h-56" />
            <div className="p-7 sm:p-12">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Become a Partner</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {[[ShoppingBag, 'Partner Sales & Exhibition Space'], [Gift, 'Exclusive Partner Offers'], [Handshake, 'Connect with Intentional Brands']].map(([I, t]) => {
                const Icon = I as typeof Gift
                return <li key={t as string} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-display font-semibold leading-tight"><Icon className="h-7 w-7 shrink-0 text-gus-orange" aria-hidden />{t as string}</li>
              })}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ExtButton href={CONTACT.whatsapp} target="_blank" rel="noreferrer" variant="dark">Chat on WhatsApp</ExtButton>
              <ExtButton href={`mailto:${CONTACT.email}?subject=Partnership%20-%20GUS%20Summit%202.0`} variant="outline">Email us</ExtButton>
            </div>
            </div>
          </div>
        </Container>
      </section>

      <PackagesPreview detailed />
      <section className="bg-[#fbf8f5] py-12 text-center">
        <Container className="max-w-2xl"><p className="font-display text-xl font-semibold sm:text-2xl">This isn&apos;t just your normal business talk. It&apos;s about aligning your hustle with <span className="text-gus-orange">barakah!</span></p></Container>
      </section>
      <CtaBand />
    </>
  )
}
