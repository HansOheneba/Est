"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useSaved } from "@/lib/useSaved";

export default function SaveButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { isSaved, toggle } = useSaved();
  const on = isSaved(slug);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      aria-pressed={on}
      aria-label={on ? "Remove from saved" : "Save home"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={`grid h-10 w-10 place-items-center rounded-full bg-night/70 text-bone shadow-md backdrop-blur transition hover:bg-night ${className}`}
    >
      <motion.span key={String(on)} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
        <Heart className={`h-4 w-4 ${on ? "fill-red-500 text-red-500" : ""}`} />
      </motion.span>
    </motion.button>
  );
}
