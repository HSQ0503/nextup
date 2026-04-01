import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/team", label: "Team" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-navy-darker px-6 py-8 sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-[13px] text-white/25">
          &copy; {new Date().getFullYear()} Career Compass
        </span>
        <div className="flex gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/25 transition-colors hover:text-gold cursor-pointer"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
