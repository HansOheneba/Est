"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "haven:saved";
const listeners = new Set<() => void>();
const EMPTY: string[] = [];
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    cache = [];
  }
  return cache!;
}

function write(next: string[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode); keep in memory only
  }
  listeners.forEach((l) => l());
}

export function useSaved() {
  const saved = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => EMPTY,
  );

  const toggle = useCallback((slug: string) => {
    const cur = read();
    write(cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]);
  }, []);

  return { saved, toggle, isSaved: (slug: string) => saved.includes(slug) };
}
