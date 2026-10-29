"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { img } from "@/lib/data";
import SearchPanel from "./SearchPanel";

const words = ["Find", "the", "place", "that", "feels", "like", "you."];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.32]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      <motion.div style={{ scale, y, borderBottomLeftRadius: radius, borderBottomRightRadius: radius }} className="absolute inset-0 overflow-hidden">
        <Image
          src={img("1600596542815-ffad4c1539a9", 2400)}
          alt="Modern white villa with a pool"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-10 text-white sm:px-8 sm:pb-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-5 text-xs uppercase tracking-[0.3em] text-white/80"
        >
          Accra • Est. 2014 • 600+ homes placed
        </motion.p>

        <h1 className="max-w-4xl font-serif text-[13vw] leading-[0.95] tracking-[-0.01em] sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block ${w === "feels" ? "italic text-brass" : ""}`}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10"
        >
          <SearchPanel />
        </motion.div>
      </motion.div>
    </section>
  );
}
