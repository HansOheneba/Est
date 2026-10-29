"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { areas, img, listings } from "@/lib/data";

export default function AreaExplorer() {
  const [active, setActive] = useState(0);
  const area = areas[active];
  const count = listings.filter((l) => l.area === area.name).length;

  return (
    <section id="areas" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-brass">Neighbourhoods</p>
        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Every part of Accra has its own rhythm.
        </h2>
        <p className="mt-4 text-ink/60">Hover a neighbourhood to see what life there looks like.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
        <ul className="flex flex-col">
          {areas.map((a, i) => (
            <li key={a.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-center justify-between border-b border-ink/10 py-5 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-xs tabular-nums text-ink/35">0{i + 1}</span>
                  <span
                    className={`font-serif text-3xl transition-all duration-500 sm:text-4xl ${
                      i === active ? "translate-x-2 text-forest italic" : "text-ink/35 group-hover:text-ink/70"
                    }`}
                  >
                    {a.name}
                  </span>
                </span>
                <motion.span animate={{ rotate: i === active ? 0 : -45, opacity: i === active ? 1 : 0.3 }}>
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </button>
            </li>
          ))}
        </ul>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-sand sm:aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={area.name}
              initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
              animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
              exit={{ opacity: 0.6 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <Image src={img(area.image, 1600)} alt={area.name} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <p className="max-w-md font-serif text-2xl leading-snug sm:text-3xl">{area.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.vibe.map((v) => (
                    <span key={v} className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs backdrop-blur">{v}</span>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/20 pt-5 text-sm">
                  <div><p className="text-white/60 text-xs">Typical price</p><p className="mt-1 font-medium">{area.avgPrice}</p></div>
                  <div><p className="text-white/60 text-xs">Commute</p><p className="mt-1 font-medium">{area.commute}</p></div>
                  <div>
                    <p className="text-white/60 text-xs">Available now</p>
                    <Link href={`/listings?area=${encodeURIComponent(area.name)}`} className="mt-1 inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline">
                      {count} {count === 1 ? "home" : "homes"} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
