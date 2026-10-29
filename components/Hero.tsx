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
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-bone">
      <motion.div style={{ scale, y, borderBottomLeftRadius: radius, borderBottomRightRadius: radius }} className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.25, filter: "brightness(0.3)" }}
          animate={{ scale: 1, filter: "brightness(1)" }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={img("1600585154526-990dced4db0d")}
            alt="Modern home lit up at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        {/* warm grade + vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(18_16_14/0.75)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-clay/10 to-night" />
      </motion.div>

      {/* letterbox bars that open like a film title */}
      <motion.div
        aria-hidden
        initial={{ height: "18vh" }}
        animate={{ height: "0vh" }}
        transition={{ delay: 0.6, duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 top-0 z-20 bg-black"
      />
      <motion.div
        aria-hidden
        initial={{ height: "18vh" }}
        animate={{ height: "0vh" }}
        transition={{ delay: 0.6, duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 bottom-0 z-20 bg-black"
      />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-10 text-white sm:px-8 sm:pb-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-amber"
        >
          Accra • Est. 2014 • 600+ homes placed
        </motion.p>

        <h1 className="max-w-3xl font-serif text-[15vw] leading-[0.92] sm:text-7xl lg:text-[88px]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 1.1 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block ${w === "feels" ? "italic text-amber" : ""}`}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-10"
        >
          <SearchPanel />
        </motion.div>
      </motion.div>
    </section>
  );
}
