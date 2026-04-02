"use client";

import { Edit3, BarChart3, CheckCircle2 } from "lucide-react";
import BorderGlow from "@/components/border-glow";

const steps = [
  { num: "01", title: "Take the Quiz", desc: "Answer questions about your interests, strengths, and what kind of work environment excites you.", icon: <Edit3 size={20} className="text-gold" /> },
  { num: "02", title: "Get Your Results", desc: "See your top 2\u20133 career paths with detailed descriptions. Download them as a PDF to keep.", icon: <BarChart3 size={20} className="text-gold" /> },
  { num: "03", title: "Take Action", desc: "Join a chapter, attend events, connect with mentors, and start building toward your future.", icon: <CheckCircle2 size={20} className="text-gold" /> },
];

export default function StepCards() {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step) => (
        <BorderGlow
          key={step.num}
          backgroundColor="rgba(255,255,255,0.03)"
          borderRadius={20}
          glowColor="43 70 65"
          colors={["#C9A84C", "#DBBE66", "#2D5F8A"]}
          glowRadius={30}
          glowIntensity={0.8}
          edgeSensitivity={25}
          coneSpread={30}
          fillOpacity={0.3}
          className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer"
        >
          <div className="relative p-10">
            <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-[10px] bg-gold/[0.08]">
              {step.icon}
            </div>
            <div className="mb-5 font-heading text-[64px] font-black leading-none text-gold/30">
              {step.num}
            </div>
            <h3 className="mb-3 font-heading text-lg font-bold tracking-tight">
              {step.title}
            </h3>
            <p className="text-[0.95rem] font-light leading-relaxed text-white/55">
              {step.desc}
            </p>
          </div>
        </BorderGlow>
      ))}
    </div>
  );
}
