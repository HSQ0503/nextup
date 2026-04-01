import type { Metadata } from "next";
import { User } from "lucide-react";
import PageHero from "@/components/page-hero";
import { team } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "Our Team — Career Compass",
  description: "Meet the team behind Career Compass.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Meet the Team"
        subtitle="The people behind Career Compass — students helping students find their path."
      />
      <div className="mx-auto grid max-w-[1100px] gap-5 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <div
            key={i}
            className={`group rounded-[20px] border p-8 text-center transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)] cursor-pointer ${
              member.isFounder
                ? "border-gold/15 bg-gold/[0.04] hover:border-gold/25"
                : "border-gold/[0.06] bg-white/[0.03] hover:border-gold/15 hover:bg-gold/[0.04]"
            }`}
          >
            <div
              className={`mx-auto mb-5 flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full border-2 bg-gradient-to-br from-navy to-navy-light ${
                member.isFounder
                  ? "border-gold/30 shadow-[0_0_24px_rgba(201,168,76,0.1)]"
                  : "border-gold/10"
              }`}
            >
              <User size={36} className="text-white/15" />
            </div>
            <h3 className="mb-1 font-heading text-base font-semibold tracking-tight">
              {member.name}
            </h3>
            <p className="mb-3 text-xs font-medium text-gold tracking-wide">
              {member.role}
            </p>
            <p className="text-[0.85rem] leading-relaxed text-white/55">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
