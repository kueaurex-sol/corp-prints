"use client";
import { useEffect, useState } from "react";

// Shows `fallback` first, then swaps in database content if there is any.
// `fallback` must be a module-level constant (stable reference).
export default function useContent(path, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    let live = true;
    fetch(path)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (live && Array.isArray(j) && j.length) setData(j); })
      .catch(() => {});
    return () => { live = false; };
  }, [path]);
  return data;
}