"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Voice & Market Hub", href: "/voice-hub" },
  { label: "Farm to Market", href: "/market" },
  { label: "Tasker Radar", href: "/radar" },
  { label: "Wallet", href: "/wallet" },
  { label: "State Command Deck", href: "/igr-analytics" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between px-5 sm:px-10 py-4 border-b border-ekiti-neutral/10 bg-ekiti-canvas">
      <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
        <div className="w-8 h-8 rounded-sm flex items-center justify-center bg-ekiti-green">
          <span className="text-white text-xs font-bold font-mono">EK</span>
        </div>
        <span className="text-sm sm:text-base font-semibold tracking-tight">
          EkitiWorks <span className="text-ekiti-gold">·</span>{" "}
          <span className="opacity-60 font-normal">Omoluabi Digital</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex items-center gap-5">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-ekiti-neutral hover:opacity-70">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#EAF2ED] text-ekiti-green">
          <CheckCircle2 size={13} /> Ekiti State Government Platform
        </div>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-sm bg-[#EAF2ED] text-ekiti-green"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-30 border-t border-white/10 bg-ekiti-neutral">
          <nav className="flex flex-col px-5 py-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-base font-medium border-b border-white/10 text-ekiti-canvas flex items-center justify-between min-h-[56px]"
              >
                {l.label}
                <ArrowUpRight size={16} className="text-ekiti-gold" />
              </Link>
            ))}
            <div className="py-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ekiti-gold">
              <CheckCircle2 size={13} /> Ekiti State Government Platform
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
