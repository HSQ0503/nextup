export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative text-center px-6 pt-36 pb-14 max-w-3xl mx-auto">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.06), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative">
        <h1 className="font-heading text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-white/55 text-lg leading-relaxed font-light max-w-md mx-auto">
          {subtitle}
        </p>
        <div className="mx-auto mt-5 h-[3px] w-12 rounded-full bg-gradient-to-r from-gold to-transparent" />
      </div>
    </div>
  );
}
