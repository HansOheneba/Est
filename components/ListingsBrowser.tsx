"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, SlidersHorizontal, X, Scale } from "lucide-react";
import { formatPrice, img, listings, type Deal, type ListingType } from "@/lib/data";
import { useSaved } from "@/lib/useSaved";
import ListingCard from "./ListingCard";

const types: ListingType[] = ["Villa", "House", "Apartment", "Townhouse"];
const sorts = {
  featured: "Featured",
  low: "Price: low to high",
  high: "Price: high to low",
  size: "Largest first",
} as const;

export default function ListingsBrowser() {
  const params = useSearchParams();
  const [deal, setDeal] = useState<Deal | "All">((params.get("deal") as Deal) ?? "All");
  const [area, setArea] = useState(params.get("area") ?? "");
  const [beds, setBeds] = useState(Number(params.get("beds") ?? 0));
  const [picked, setPicked] = useState<ListingType[]>([]);
  const [sort, setSort] = useState<keyof typeof sorts>("featured");
  const [onlySaved, setOnlySaved] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const { saved } = useSaved();

  const allAreas = useMemo(() => Array.from(new Set(listings.map((l) => l.area))), []);

  const results = useMemo(() => {
    const r = listings.filter(
      (l) =>
        (deal === "All" || l.deal === deal) &&
        (!area || l.area === area) &&
        l.beds >= beds &&
        (picked.length === 0 || picked.includes(l.type)) &&
        (!onlySaved || saved.includes(l.slug)),
    );
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    if (sort === "high") r.sort((a, b) => b.price - a.price);
    if (sort === "size") r.sort((a, b) => b.sqm - a.sqm);
    return r;
  }, [deal, area, beds, picked, sort, onlySaved, saved]);

  const toggleCompare = (slug: string) =>
    setCompare((c) => (c.includes(slug) ? c.filter((s) => s !== slug) : c.length >= 3 ? c : [...c, slug]));

  const reset = () => {
    setDeal("All");
    setArea("");
    setBeds(0);
    setPicked([]);
    setOnlySaved(false);
  };

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition ${on ? "border-clay bg-clay text-bone" : "border-bone/15 hover:border-bone/40"}`;

  const comparing = listings.filter((l) => compare.includes(l.slug));

  return (
    <div className="mx-auto max-w-7xl px-5 pb-32 sm:px-8">
      {/* Filters */}
      <div className="sticky top-[68px] z-30 -mx-5 mb-10 border-b border-bone/10 bg-night/90 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="mr-1 h-4 w-4 text-bone/50" />
          {(["All", "Buy", "Rent"] as const).map((d) => (
            <button key={d} type="button" onClick={() => setDeal(d)} className={chip(deal === d)}>
              {d === "All" ? "Buy & rent" : d}
            </button>
          ))}
          <span className="mx-1 hidden h-6 w-px bg-bone/10 sm:block" />
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))}
              className={chip(picked.includes(t))}
            >
              {t}
            </button>
          ))}
          <span className="mx-1 hidden h-6 w-px bg-bone/10 sm:block" />
          <select value={area} onChange={(e) => setArea(e.target.value)} className="rounded-full border border-bone/15 bg-transparent px-4 py-2 text-sm outline-none">
            <option value="">All areas</option>
            {allAreas.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select value={beds} onChange={(e) => setBeds(Number(e.target.value))} className="rounded-full border border-bone/15 bg-transparent px-4 py-2 text-sm outline-none">
            <option value={0}>Any beds</option>
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+ beds</option>)}
          </select>
          <button type="button" onClick={() => setOnlySaved((v) => !v)} className={`${chip(onlySaved)} inline-flex items-center gap-1.5`}>
            <Heart className={`h-3.5 w-3.5 ${onlySaved ? "fill-current" : ""}`} /> Saved ({saved.length})
          </button>
          <div className="ml-auto flex items-center gap-3">
            <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} className="bg-transparent text-sm outline-none">
              {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between text-sm text-bone/55">
        <motion.p key={results.length} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
          {results.length} {results.length === 1 ? "home" : "homes"} found
        </motion.p>
        <p className="hidden sm:block">Tick “Compare” on up to three homes.</p>
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((l) => (
            <motion.div
              key={l.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <ListingCard listing={l}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={compare.includes(l.slug)}
                  onClick={(e) => {
                    // the card is a link; keep this click from navigating
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCompare(l.slug);
                  }}
                  className={`absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur transition ${
                    compare.includes(l.slug) ? "bg-clay text-bone" : "bg-night/70 text-bone"
                  }`}
                >
                  <span className={`grid h-3.5 w-3.5 place-items-center rounded-[4px] border ${compare.includes(l.slug) ? "border-bone bg-bone text-clay" : "border-bone/40"}`}>
                    {compare.includes(l.slug) ? "✓" : ""}
                  </span>
                  Compare
                </button>
              </ListingCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-3xl">Nothing matches, yet.</p>
          <button type="button" onClick={reset} className="mt-4 rounded-full bg-clay px-6 py-3 text-sm text-bone">Clear filters</button>
        </div>
      ) : null}

      {/* Compare tray */}
      <AnimatePresence>
        {compare.length > 0 ? (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[calc(100%-2rem)] max-w-2xl items-center gap-3 rounded-full bg-bone p-2 pl-4 text-night shadow-2xl"
          >
            <div className="flex -space-x-3">
              {comparing.map((l) => (
                <span key={l.slug} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-bone">
                  <Image src={img(l.cover)} alt={l.name} fill sizes="40px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="flex-1 text-sm">{compare.length} of 3 selected</p>
            <button type="button" onClick={() => setCompare([])} className="rounded-full px-3 py-2 text-sm text-night/60 hover:text-night">Clear</button>
            <button
              type="button"
              disabled={compare.length < 2}
              onClick={() => setShowCompare(true)}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
            >
              <Scale className="h-4 w-4" /> Compare
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Compare modal */}
      <AnimatePresence>
        {showCompare ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-bone/60 p-4 backdrop-blur-sm" onClick={() => setShowCompare(false)}>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[32px] bg-night p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-3xl">Side by side</h2>
                <button type="button" aria-label="Close" onClick={() => setShowCompare(false)} className="rounded-full p-2 hover:bg-surface"><X className="h-5 w-5" /></button>
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: `120px repeat(${comparing.length}, minmax(0,1fr))` }}>
                <div />
                {comparing.map((l) => (
                  <Link key={l.slug} href={`/listings/${l.slug}`} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image src={img(l.cover)} alt={l.name} fill sizes="250px" className="object-cover transition group-hover:scale-105" />
                    </div>
                    <p className="mt-2 font-serif text-lg leading-tight">{l.name}</p>
                  </Link>
                ))}
                {(
                  [
                    ["Price", (l) => formatPrice(l)],
                    ["Area", (l) => l.area],
                    ["Type", (l) => l.type],
                    ["Bedrooms", (l) => l.beds],
                    ["Bathrooms", (l) => l.baths],
                    ["Size", (l) => `${l.sqm} m²`],
                    ["Built", (l) => l.year],
                  ] as const satisfies readonly (readonly [string, (l: (typeof listings)[number]) => React.ReactNode])[]
                ).map(([label, fn]) => (
                  <div key={label} className="contents">
                    <p className="border-t border-bone/10 pt-3 text-sm text-bone/50">{label}</p>
                    {comparing.map((l) => (
                      <p key={l.slug} className="border-t border-bone/10 pt-3 text-sm font-medium">{fn(l)}</p>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
