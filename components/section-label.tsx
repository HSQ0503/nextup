export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="h-px w-6 bg-gold/40" />
      <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
        {children}
      </span>
      <span className="h-px w-6 bg-gold/40" />
    </div>
  );
}
