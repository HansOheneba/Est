import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, CalendarDays, Check, MapPin, Maximize } from "lucide-react";
import { formatPrice, listings } from "@/lib/data";
import Gallery from "@/components/Gallery";
import ViewingForm from "@/components/ViewingForm";
import SaveButton from "@/components/SaveButton";
import ListingCard from "@/components/ListingCard";
import MortgageCalculator from "@/components/MortgageCalculator";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: PageProps<"/listings/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const l = listings.find((x) => x.slug === slug);
  return l ? { title: l.name, description: l.blurb } : {};
}

export default async function ListingPage(props: PageProps<"/listings/[slug]">) {
  const { slug } = await props.params;
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) notFound();

  const similar = listings.filter((l) => l.slug !== listing.slug && (l.deal === listing.deal || l.area === listing.area)).slice(0, 3);

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link href="/listings" className="mb-6 inline-flex items-center gap-2 text-sm text-bone/60 hover:text-bone">
          <ArrowLeft className="h-4 w-4" /> All listings
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm text-bone/55"><MapPin className="h-4 w-4" /> {listing.address}</p>
            <h1 className="mt-2 font-serif text-5xl leading-none sm:text-7xl">{listing.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-serif text-4xl text-clay">{formatPrice(listing)}</p>
            <SaveButton slug={listing.slug} className="border border-bone/10" />
          </div>
        </div>

        <Gallery images={listing.gallery} name={listing.name} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: BedDouble, label: "Bedrooms", value: listing.beds },
                { icon: Bath, label: "Bathrooms", value: listing.baths },
                { icon: Maximize, label: "Interior", value: `${listing.sqm} m²` },
                { icon: CalendarDays, label: "Built", value: listing.year },
              ].map((s) => (
                <div key={s.label} className="rounded-3xl bg-surface p-5 ring-1 ring-bone/5">
                  <s.icon className="h-5 w-5 text-amber" />
                  <p className="mt-3 font-serif text-2xl">{s.value}</p>
                  <p className="text-xs text-bone/50">{s.label}</p>
                </div>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-14 font-serif text-3xl">About this home</h2>
              <p className="mt-4 text-lg leading-relaxed text-bone/70">{listing.blurb}</p>
            </Reveal>

            <Reveal>
              <h2 className="mt-14 font-serif text-3xl">What&apos;s included</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {listing.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 rounded-2xl border border-bone/10 px-4 py-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-clay text-white"><Check className="h-3.5 w-3.5" /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ViewingForm home={listing.name} />
          </aside>
        </div>
      </div>

      {listing.deal === "Buy" ? <MortgageCalculator initialPrice={listing.price} /> : <div className="h-24" />}

      {similar.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <h2 className="mb-8 font-serif text-4xl">You might also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
