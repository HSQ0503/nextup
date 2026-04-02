"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/team", label: "Team" },
  { href: "/volunteer", label: "Volunteer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-6 right-6 z-50 flex items-center justify-between rounded-2xl border border-gold/[0.08] bg-navy-deep/60 px-7 py-3.5 backdrop-blur-[24px] backdrop-saturate-150">
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/logo/image.png"
          alt="NextStep logo"
          width={120}
          height={28}
          priority
        />
      </Link>

      {/* Desktop nav */}
      <div className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[13.5px] text-white/55 transition-colors hover:text-gold"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/quiz"
          className="rounded-[10px] bg-gold px-5 py-2 text-[13px] font-semibold text-navy-deep transition-all hover:bg-gold-light hover:-translate-y-0.5 cursor-pointer"
        >
          Take the Quiz
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white/55 cursor-pointer"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 flex flex-col gap-1 rounded-2xl border border-gold/[0.08] bg-navy-deep/90 p-4 backdrop-blur-[24px] md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quiz"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-lg bg-gold px-4 py-3 text-center text-sm font-semibold text-navy-deep"
          >
            Take the Quiz
          </Link>
        </div>
      )}
    </nav>
  );
}
