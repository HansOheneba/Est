import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import Hero from "@/components/Hero";
import FeaturedScroller from "@/components/FeaturedScroller";
import AreaExplorer from "@/components/AreaExplorer";
import RoomTour from "@/components/RoomTour";
import MortgageCalculator from "@/components/MortgageCalculator";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import ViewingForm from "@/components/ViewingForm";
import { img, listings } from "@/lib/data";

const marquee = ["Cantonments", "East Legon", "Airport Residential", "Trasacco", "Labone", "Ridge", "Osu", "Aburi"];

export default function Home() {
  const rentals = listings.filter((l) => l.deal === "Rent");

  return (
    <main>
      <Hero />

      {/* Marquee */}
      <div className="overflow-hidden border-b border-bone/10 bg-night py-6">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-12 whitespace-nowrap font-serif text-3xl text-bone/25 sm:text-4xl">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12">
              {m} <span className="text-amber">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Intro + stats */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-amber">Who we are</p>
          <h2 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            We don&apos;t sell square metres. We find the place your life fits into.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-lg leading-relaxed text-bone/65">
            For more than a decade, Haven &amp; Co. has matched families, diplomats and returning
            Ghanaians with homes across Accra. Every listing is visited, photographed and vetted by
            our team, so what you see is what you walk into.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-bone/10 pt-8">
            <div><p className="font-serif text-4xl text-clay"><Counter to={600} suffix="+" /></p><p className="mt-1 text-sm text-bone/55">Homes placed</p></div>
            <div><p className="font-serif text-4xl text-clay"><Counter to={12} /></p><p className="mt-1 text-sm text-bone/55">Years in Accra</p></div>
            <div><p className="font-serif text-4xl text-clay"><Counter to={98} suffix="%" /></p><p className="mt-1 text-sm text-bone/55">Would refer us</p></div>
          </div>
        </Reveal>
      </section>

      <FeaturedScroller />
      <AreaExplorer />
      <RoomTour />

      {/* Rentals */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-amber">Ready to move in</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Rentals this month</h2>
          </Reveal>
          <Link href="/listings?deal=Rent" className="hidden items-center gap-2 text-sm font-medium sm:inline-flex">
            All rentals <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rentals.map((l, i) => (
            <Reveal key={l.slug} delay={i * 0.1}>
              <ListingCard listing={l} />
            </Reveal>
          ))}
        </div>
      </section>

      <MortgageCalculator />

      {/* Testimonial + viewing */}
      <section className="relative overflow-hidden bg-wine text-bone">
        <Image src={img("1600607687939-ce8a6c25118c")} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:py-32">
          <Reveal>
            <Quote className="h-10 w-10 text-amber" />
            <p className="mt-6 font-serif text-3xl leading-snug sm:text-4xl">
              We were moving back from London with two kids and a deadline. Haven found us three
              homes in a week and handled every bit of paperwork. We still send them Christmas cards.
            </p>
            <p className="mt-6 text-sm text-bone/60">Ama &amp; Kwesi B. — bought in Cantonments</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="text-bone">
              <ViewingForm home="The Glasshouse" />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
