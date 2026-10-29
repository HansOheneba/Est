"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { img } from "@/lib/data";

export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (step: number) => {
      setDir(step);
      setOpen((i) => (i === null ? i : (i + step + images.length) % images.length));
    },
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  return (
    <>
      <div className="grid h-[60vh] min-h-[420px] grid-cols-4 grid-rows-2 gap-3">
        {images.slice(0, 5).map((id, i) => (
          <motion.button
            key={id + i}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-3xl ${i === 0 ? "col-span-4 row-span-2 sm:col-span-2" : "hidden sm:block"}`}
          >
            <Image src={img(id)} alt={`${name} photo ${i + 1}`} fill priority={i === 0} sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "25vw"} className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
            {i === 0 ? (
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-night/70 px-4 py-2 text-xs font-medium text-bone backdrop-blur">
                <Expand className="h-3.5 w-3.5" /> View all {images.length} photos
              </span>
            ) : null}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/95">
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-16">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={open}
                  custom={dir}
                  initial={{ x: dir * 120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: dir * -120, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) go(1);
                    if (info.offset.x > 80) go(-1);
                  }}
                  className="relative h-full w-full cursor-grab active:cursor-grabbing"
                >
                  <Image src={img(images[open])} alt={`${name} photo ${open + 1}`} fill sizes="100vw" className="pointer-events-none object-contain" />
                </motion.div>
              </AnimatePresence>
            </div>
            <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><X className="h-5 w-5" /></button>
            <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><ChevronLeft className="h-6 w-6" /></button>
            <button type="button" aria-label="Next photo" onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><ChevronRight className="h-6 w-6" /></button>
            <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
              {images.map((id, i) => (
                <button key={id + i} type="button" aria-label={`Photo ${i + 1}`} onClick={() => { setDir(i > open ? 1 : -1); setOpen(i); }} className={`h-1.5 rounded-full transition-all ${i === open ? "w-8 bg-white" : "w-1.5 bg-white/40"}`} />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
