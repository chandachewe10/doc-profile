"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#research-areas", label: "Research" },
  { href: "#publications", label: "Publications" },
  { href: "#leadership", label: "Leadership" },
  { href: "#media", label: "Media" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-beige/95 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-sm"
      )}
    >
      <nav className="site-container flex h-[68px] items-center justify-between md:h-[72px]">
        <Link href="#" className="font-serif text-[17px] font-semibold text-ink">
          Dr. Mwenya Mubanga
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-copper"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/admin" className="btn-outline-ink">
              Dashboard
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={cn("block h-px w-5 bg-ink transition-all", open && "translate-y-[3.5px] rotate-45")} />
          <span className={cn("block h-px w-5 bg-ink transition-all", open && "opacity-0")} />
          <span className={cn("block h-px w-5 bg-ink transition-all", open && "-translate-y-[3.5px] -rotate-45")} />
        </button>
      </nav>

      <div className={cn("border-t border-border bg-beige lg:hidden", open ? "block" : "hidden")}>
        <div className="site-container py-4">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink"
            >
              {label}
            </a>
          ))}
          <Link href="/admin" onClick={() => setOpen(false)} className="btn-outline-ink mt-4 inline-flex">
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
