import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-night text-bone">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl">
            Haven <span className="text-amber">&amp;</span> Co.
          </p>
          <p className="mt-3 max-w-sm text-sm text-bone/60">
            Homes with character across Accra. Buying, selling, letting and
            everything in between.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-bone/40">Visit</p>
          <p className="text-bone/80">12 Senchi Link, Cantonments</p>
          <p className="text-bone/80">Accra, Ghana</p>
          <p className="mt-2 text-bone/80">Mon–Sat, 9am–6pm</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-bone/40">Explore</p>
          <ul className="space-y-1.5 text-bone/80">
            <li><Link href="/listings" className="hover:text-amber">All listings</Link></li>
            <li><Link href="/listings?deal=Rent" className="hover:text-amber">Rentals</Link></li>
            <li><Link href="/#areas" className="hover:text-amber">Neighbourhoods</Link></li>
            <li><Link href="/#calculator" className="hover:text-amber">Mortgage calculator</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-bone/40 sm:px-8">
          A concept site designed and built by{" "}
          <a href="https://hansopoku.com" className="underline hover:text-amber">Hans Opoku</a>.
          Listings and prices are illustrative.
        </p>
      </div>
    </footer>
  );
}
