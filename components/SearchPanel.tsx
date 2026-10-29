"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { areas } from "@/lib/data";

export default function SearchPanel() {
  const router = useRouter();
  const [deal, setDeal] = useState<"Buy" | "Rent">("Buy");
  const [area, setArea] = useState("");
  const [beds, setBeds] = useState(0);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({ deal });
    if (area) q.set("area", area);
    if (beds) q.set("beds", String(beds));
    router.push(`/listings?${q.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-3xl rounded-[28px] bg-white/95 p-2 text-ink shadow-2xl backdrop-blur"
    >
      <div className="flex gap-1 p-1">
        {(["Buy", "Rent"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDeal(d)}
            className="relative rounded-full px-5 py-2 text-sm font-medium"
          >
            {deal === d ? (
              <motion.span
                layoutId="deal-pill"
                className="absolute inset-0 rounded-full bg-forest"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className={`relative ${deal === d ? "text-ivory" : "text-ink/60"}`}>{d}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-2 p-1 sm:grid-cols-[1fr_1fr_auto]">
        <label className="rounded-2xl bg-ivory px-4 py-3">
          <span className="block text-[11px] uppercase tracking-wider text-ink/50">Neighbourhood</span>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full bg-transparent text-sm font-medium outline-none"
          >
            <option value="">Anywhere in Accra</option>
            {areas.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
            <option>Labone</option>
            <option>Ridge</option>
            <option>Osu</option>
          </select>
        </label>

        <div className="rounded-2xl bg-ivory px-4 py-3">
          <span className="block text-[11px] uppercase tracking-wider text-ink/50">Bedrooms</span>
          <div className="mt-1 flex gap-1">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setBeds(n)}
                className={`h-7 min-w-7 rounded-full px-2 text-xs font-medium transition ${
                  beds === n ? "bg-ink text-white" : "hover:bg-sand"
                }`}
              >
                {n === 0 ? "Any" : `${n}+`}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="group flex items-center justify-center gap-2 rounded-2xl bg-brass px-7 py-4 text-sm font-semibold text-white transition hover:bg-forest"
        >
          <Search className="h-4 w-4 transition group-hover:scale-110" />
          Search
        </button>
      </div>
    </form>
  );
}
