"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/listings", label: "Listings" },
  { href: "/#areas", label: "Neighbourhoods" },
  { href: "/#tour", label: "Tour" },
  { href: "/#calculator", label: "Calculator" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        overHero
          ? "bg-transparent py-6 text-white"
          : "bg-night/85 py-3 text-bone shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-serif text-2xl tracking-tight">
          Haven <span className="text-amber">&amp;</span> Co.
        </Link>

        <nav className="hidden items-center gap-8 text-[13.5px] font-medium md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="group relative py-1">
              {l.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/listings"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-medium transition sm:inline-flex ${
              overHero
                ? "bg-bone text-night hover:bg-amber"
                : "bg-clay text-bone hover:bg-clay-deep"
            }`}
          >
            Find a home
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-3 rounded-3xl bg-night p-4 text-bone shadow-xl md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-serif text-xl hover:bg-surface"
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
