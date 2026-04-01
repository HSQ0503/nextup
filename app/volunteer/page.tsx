import type { Metadata } from "next";
import { Users, Calendar, BookOpen } from "lucide-react";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Get Involved — Career Compass",
  description: "Volunteer with Career Compass and help students discover their career paths.",
};

const perks = [
  {
    icon: <Users size={16} className="text-gold" />,
    title: "Lead a Chapter",
    desc: "Start a Career Compass chapter at your school",
  },
  {
    icon: <Calendar size={16} className="text-gold" />,
    title: "Organize Events",
    desc: "Help plan guest speaker sessions and career workshops",
  },
  {
    icon: <BookOpen size={16} className="text-gold" />,
    title: "Mentoring",
    desc: "Guide students through their career exploration journey",
  },
];

const GOOGLE_FORM_URL = "";

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        title="Get Involved"
        subtitle="Want to help students find their path? Join Career Compass as a volunteer."
      />
      <div className="mx-auto grid max-w-[1100px] items-start gap-10 px-6 pb-20 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-heading text-xl font-bold tracking-tight sm:text-2xl">
            Why Volunteer?
          </h2>
          <p className="mb-7 text-[0.95rem] font-light leading-relaxed text-white/55">
            Career Compass is growing, and we need passionate people to help us
            reach more students. Whether you want to mentor, organize events, or
            help run a chapter at your school — there&apos;s a place for you.
          </p>
          <div className="flex flex-col gap-3.5">
            {perks.map((p) => (
              <div key={p.title} className="flex gap-3 items-start">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-gold/[0.12] bg-gold/[0.08]">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-[0.9rem] font-semibold font-heading">{p.title}</h4>
                  <p className="text-[0.82rem] text-white/55 leading-snug">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[20px] border border-gold/[0.06] bg-white/[0.03] p-8">
          <div className="mb-4 flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.08em] text-gold">
            <BookOpen size={14} />
            Volunteer Application
          </div>
          {GOOGLE_FORM_URL ? (
            <iframe
              src={GOOGLE_FORM_URL}
              title="Volunteer Application Form"
              className="h-[500px] w-full rounded-[14px] border-0"
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-white/[0.08] bg-white/[0.03] px-6 py-16 text-center">
              <BookOpen size={40} className="mb-3 text-white/10" />
              <p className="text-[0.85rem] text-white/55 mb-1">
                Google Form will be embedded here
              </p>
              <span className="text-xs text-white/25">
                Fields: Name, Email, School, Grade, How They&apos;d Like to Help
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
