export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center px-6 pt-32 pb-10 max-w-3xl mx-auto">
      <h1 className="font-heading text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-tight mb-3">
        {title}
      </h1>
      <p className="text-white/55 text-lg leading-relaxed font-light max-w-md mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
