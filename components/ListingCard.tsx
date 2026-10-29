"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BedDouble, Bath, Maximize } from "lucide-react";
import { formatPrice, img, type Listing } from "@/lib/data";
import SaveButton from "./SaveButton";

export default function ListingCard({
  listing,
  tall = false,
  children,
}: {
  listing: Listing;
  tall?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const shineX = useTransform(mx, [0, 1], ["0%", "100%"]);

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.div style={{ perspective: 1000 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Link
          ref={ref}
          href={`/listings/${listing.slug}`}
          onMouseMove={onMove}
          onMouseLeave={() => {
            mx.set(0.5);
            my.set(0.5);
          }}
          className="group block overflow-hidden rounded-[28px] bg-surface ring-1 ring-bone/5 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.8)]"
        >
          <div className={`relative overflow-hidden ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
            <Image
              src={img(listing.cover, 1200)}
              alt={listing.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-[1.2s] ease-out group-hover:scale-110 grade"
            />
            <motion.div
              style={{ left: shineX }}
              className="pointer-events-none absolute -top-1/2 h-[200%] w-24 -translate-x-1/2 rotate-12 bg-white/20 opacity-0 blur-2xl transition group-hover:opacity-100"
            />
            <div className="absolute left-4 top-4 flex gap-2">
              <span className="rounded-full bg-night/70 px-3 py-1 text-xs font-medium text-bone backdrop-blur">
                {listing.deal === "Rent" ? "For rent" : "For sale"}
              </span>
              <span className="rounded-full bg-clay/85 px-3 py-1 text-xs font-medium text-bone backdrop-blur">
                {listing.type}
              </span>
            </div>
            <SaveButton slug={listing.slug} className="absolute right-4 top-4" />
            {children}
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-xl leading-tight">{listing.name}</h3>
                <p className="mt-1 text-sm text-bone/55">{listing.area}</p>
              </div>
              <p className="whitespace-nowrap font-serif text-lg text-amber">{formatPrice(listing)}</p>
            </div>
            <div className="mt-4 flex gap-4 border-t border-bone/10 pt-4 text-xs text-bone/65">
              <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5" />{listing.beds} beds</span>
              <span className="flex items-center gap-1.5"><Bath className="h-3.5 w-3.5" />{listing.baths} baths</span>
              <span className="flex items-center gap-1.5"><Maximize className="h-3.5 w-3.5" />{listing.sqm} m²</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
