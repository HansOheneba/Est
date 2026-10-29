"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { img, rooms } from "@/lib/data";

export default function RoomTour() {
  const [roomIdx, setRoomIdx] = useState(0);
  const [spot, setSpot] = useState<number | null>(null);
  const room = rooms[roomIdx];

  return (
    <section id="tour" className="scroll-mt-24 bg-night py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-amber">Step inside • The Glasshouse</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Take the tour before the viewing.</h2>
            <p className="mt-4 text-bone/60">Switch rooms and tap the markers to see the details that matter.</p>
          </div>
          <div className="flex flex-wrap gap-2 rounded-full bg-bone/5 p-1.5">
            {rooms.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => {
                  setRoomIdx(i);
                  setSpot(null);
                }}
                className="relative rounded-full px-5 py-2 text-sm"
              >
                {i === roomIdx ? (
                  <motion.span layoutId="room-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                ) : null}
                <span className={`relative ${i === roomIdx ? "text-night" : "text-bone/70"}`}>{r.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] sm:aspect-[16/9]" onClick={() => setSpot(null)}>
          <AnimatePresence initial={false}>
            <motion.div
              key={room.name}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.06] }}
                transition={{ duration: 14, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
              >
                <Image src={img(room.image)} alt={`${room.name} room`} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-black/15" />
            </motion.div>
          </AnimatePresence>

          {room.hotspots.map((h, i) => (
            <div key={`${room.name}-${i}`} className="absolute z-10" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
              <motion.button
                type="button"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.12, type: "spring" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSpot(spot === i ? null : i);
                }}
                aria-label={h.title}
                className="relative -translate-x-1/2 -translate-y-1/2"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
                <span className={`relative grid h-9 w-9 place-items-center rounded-full bg-white text-night shadow-lg transition ${spot === i ? "rotate-45 bg-amber text-white" : ""}`}>
                  <Plus className="h-4 w-4" />
                </span>
              </motion.button>
              <AnimatePresence>
                {spot === i ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute top-6 w-60 rounded-2xl bg-bone p-4 text-night shadow-2xl ${h.x > 60 ? "right-0" : "left-0"}`}
                  >
                    <p className="font-semibold">{h.title}</p>
                    <p className="mt-1 text-sm text-night/65">{h.body}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}

          <div className="absolute bottom-5 left-5 z-10 rounded-full bg-black/40 px-4 py-2 text-xs backdrop-blur">
            {String(roomIdx + 1).padStart(2, "0")} / {String(rooms.length).padStart(2, "0")} — {room.name}
          </div>
        </div>
      </div>
    </section>
  );
}
