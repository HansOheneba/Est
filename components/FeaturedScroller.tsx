"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, img, listings } from "@/lib/data";

const featured = listings.filter((l) => l.deal === "Buy").slice(0, 5);

export default function FeaturedScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-wine text-bone">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between gap-6 px-5 sm:px-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-amber">Featured residences</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-6xl">
              Keep scrolling,
              <br />
              <span className="italic text-bone/70">the homes keep coming.</span>
            </h2>
          </div>
          <Link href="/listings" className="hidden items-center gap-2 rounded-full border border-bone/30 px-5 py-2.5 text-sm transition hover:bg-bone hover:text-night sm:inline-flex">
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pl-5 sm:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {featured.map((l, i) => (
            <Link
              key={l.slug}
              href={`/listings/${l.slug}`}
              className="group relative h-[58vh] w-[80vw] shrink-0 overflow-hidden rounded-[32px] sm:w-[46vw] lg:w-[36vw]"
            >
              <Image
                src={img(l.cover)}
                alt={l.name}
                fill
                sizes="(min-width: 1024px) 36vw, 80vw"
                className="object-cover transition duration-[1.4s] ease-out group-hover:scale-110 grade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute left-6 top-6 font-serif text-6xl text-white/25">0{i + 1}</span>
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">{l.area}</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">{l.name}</h3>
                  <p className="mt-1 text-sm text-white/80">
                    {l.beds} beds • {l.sqm} m² • {formatPrice(l)}
                  </p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-night transition duration-500 group-hover:rotate-45 group-hover:bg-amber group-hover:text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-5 sm:px-8">
          <div className="h-px w-full bg-bone/15">
            <motion.div style={{ width: progress }} className="h-px bg-amber" />
          </div>
        </div>
      </div>
    </section>
  );
}
