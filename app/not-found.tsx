import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center px-5 pt-24 text-center">
      <div>
        <p className="font-serif text-8xl text-amber">404</p>
        <p className="mt-4 font-serif text-3xl">This door is locked.</p>
        <Link href="/listings" className="mt-8 inline-flex rounded-full bg-clay px-6 py-3 text-sm text-bone">Browse listings</Link>
      </div>
    </main>
  );
}
