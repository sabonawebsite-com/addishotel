"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/dishes";

// Client component living in a layout: its state is NOT reset on navigation.
// The filter text and the navigation counter prove the layout persists.
export default function Sidebar({ categories }) {
  const pathname = usePathname();
  const [filter, setFilter] = useState("");
  const [navCount, setNavCount] = useState(0);

  useEffect(() => {
    setNavCount((c) => c + 1);
  }, [pathname]);

  const visible = categories.filter((c) =>
    c.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <aside className="sidebar">
      <h2>Categories</h2>
      <input
        placeholder="Filter categories…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filter categories"
      />
      <ul>
        <li>
          <Link href="/menu" className={pathname === "/menu" ? "active" : ""}>
            All dishes
          </Link>
        </li>
        {visible.map((c) => (
          <li key={c}>
            <Link href={`/menu#${slugify(c)}`}>{c}</Link>
          </li>
        ))}
      </ul>
      <small>Pages visited with this sidebar mounted: {navCount}</small>
    </aside>
  );
}