import type { Metadata } from "next";
import { Suspense } from "react";
import ListingsBrowser from "@/components/ListingsBrowser";

export const metadata: Metadata = {
  title: "Listings",
  description: "Homes for sale and rent across Accra.",
};

export default function ListingsPage() {
  return (
    <main className="pt-28">
      <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-amber">Listings</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight sm:text-7xl">
          Homes across <span className="italic text-clay">Accra</span>
        </h1>
      </div>
      <Suspense fallback={<div className="mx-auto h-96 max-w-7xl animate-pulse rounded-3xl bg-surface px-5" />}>
        <ListingsBrowser />
      </Suspense>
    </main>
  );
}
