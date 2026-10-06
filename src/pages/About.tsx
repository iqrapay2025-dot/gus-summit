import { Globe, HeartHandshake, Flower2 } from 'lucide-react'
import { Container, SectionHeading, LinkButton, Photo, IMG, PageHero } from '../components/ui'
import { DONE } from '../data'
import { CtaBand } from '../components/sections'

const MEANS = [
  { w: 'Global', Icon: Globe, d: 'The universality of Islam, beyond borders, cultures, and backgrounds.', card: 'bg-gus-peach', badge: 'bg-gus-orange' },
  { w: 'United', Icon: HeartHandshake, d: 'Bringing sisters together in love, sisterhood, learning, and service.', card: 'bg-gus-mint', badge: 'bg-gus-green' },
  { w: 'Sisters', Icon: Flower2, d: 'The heart of GUS: a safe, supportive community to learn, teach, inspire, and grow.', card: 'bg-gus-blush', badge: 'bg-red-600' },
]

export default function About() {
  return (
    <>
      <PageHero image={IMG.five} pos="object-[center_45%]">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-gus-yellow">About GUS</p>
        <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">Global United <span className="text-gus-orange">Sisters</span></h1>
        <p className="mt-6 max-w-xl text-lg text-white/85">Global United Sisters (GUS) was founded with the intention of creating a platform where Muslim sisters can come together, learn, grow, connect, and positively impact one another.</p>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="What our name means" title="Global · United · Sisters" />
          <div className="grid gap-5 md:grid-cols-3">
            {MEANS.map(({ w, Icon, d, card, badge }) => (
              <article key={w} className={`${card} rounded-3xl p-8 text-center`}>
                <span className={`${badge} mx-auto grid h-16 w-16 place-items-center rounded-full text-white ring-4 ring-white`}><Icon className="h-8 w-8" aria-hidden /></span>
                <h3 className="mt-5 font-display text-3xl font-semibold text-gus-green">{w}</h3>
                <p className="mt-2">{d}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid items-center gap-8 md:grid-cols-2">
            <Photo id={IMG.scarves} alt="Sisters gathered around tables at a GUS hangout" w={900} h={650} className="object-[center_60%] aspect-[9/6.5] w-full rounded-[32px] shadow-lg" />
            <p className="text-center text-lg leading-relaxed md:text-left">GUS goes beyond organizing activities. It creates meaningful experiences that address real-life issues and help sisters become better versions of themselves, all for the sake of Allah.</p>
          </div>
        </Container>
      </section>

      <section className="bg-gus-cream py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Our journey" title={<>What we&apos;ve <span className="text-gus-green">done</span></>} />
          <ul className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 lg:grid-cols-4">
            {DONE.map(({ t, Icon }, i) => (
              <li key={t} className="flex flex-col items-center rounded-3xl bg-white min-w-0 p-4 text-center sm:p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <span className={`grid h-14 w-14 place-items-center rounded-full text-white ${['bg-gus-orange', 'bg-gus-green', 'bg-red-600', 'bg-gus-black'][i % 4]}`}><Icon className="h-7 w-7" aria-hidden /></span>
                <span className="mt-3 hyphens-auto break-words font-display text-[15px] font-semibold leading-snug sm:text-base">{t}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <figure className="rounded-[32px] bg-gus-green p-8 text-center text-white sm:p-14">
            <blockquote className="font-display text-xl font-semibold leading-relaxed sm:text-3xl">&ldquo;We do this for the sake of Allah. We believe in the beauty of sisterhood and the impact that can be created when sisters come together with sincere intentions.&rdquo;</blockquote>
            <figcaption className="mt-6 font-accent text-xl text-gus-yellow">And by the permission of Allah, we hope to do much more. </figcaption>
          </figure>
          <div className="mt-8 text-center"><LinkButton to="/summit">Explore Summit 2.0</LinkButton></div>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
