"use client";

export default function Compass() {
  return (
    <div className="relative h-[340px] w-[340px] lg:h-[380px] lg:w-[380px]">
      {/* Outer rings */}
      <div
        className="absolute inset-0 rounded-full border border-gold/[0.12]"
        style={{ animation: "spin-slow 60s linear infinite" }}
      >
        {/* Tick marks */}
        <span className="absolute -top-px left-1/2 h-3 w-0.5 -translate-x-1/2 bg-gold/40" />
        <span className="absolute -bottom-px left-1/2 h-3 w-0.5 -translate-x-1/2 bg-gold/40" />
      </div>
      <div
        className="absolute inset-5 rounded-full border border-gold/[0.08]"
        style={{ animation: "spin-slow 45s linear infinite reverse" }}
      />
      <div className="absolute inset-10 rounded-full border border-gold/[0.18]" />

      {/* Glass center */}
      <div className="absolute inset-[60px] flex flex-col items-center justify-center rounded-full border border-gold/[0.12] bg-navy/30 shadow-[0_0_80px_rgba(201,168,76,0.06),inset_0_0_60px_rgba(34,74,111,0.2)] backdrop-blur-[30px] backdrop-saturate-150">
        {/* Needle */}
        <div
          className="relative h-[100px] w-1"
          style={{ animation: "needle-drift 8s ease-in-out infinite" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 border-x-[8px] border-b-[50px] border-x-transparent border-b-gold drop-shadow-[0_0_8px_rgba(201,168,76,0.4)]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-x-[6px] border-t-[40px] border-x-transparent border-t-white/15" />
        </div>
        {/* Center dot */}
        <div className="absolute h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,0.4)]" />
      </div>

      {/* Cardinal points */}
      <span className="absolute top-[50px] left-1/2 -translate-x-1/2 font-heading text-[13px] font-semibold text-gold tracking-wide">
        N
      </span>
      <span className="absolute bottom-[50px] left-1/2 -translate-x-1/2 font-heading text-[13px] font-semibold text-gold/50 tracking-wide">
        S
      </span>
      <span className="absolute right-[50px] top-1/2 -translate-y-1/2 font-heading text-[13px] font-semibold text-gold/50 tracking-wide">
        E
      </span>
      <span className="absolute left-[50px] top-1/2 -translate-y-1/2 font-heading text-[13px] font-semibold text-gold/50 tracking-wide">
        W
      </span>

      {/* Floating stat cards */}
      <div
        className="absolute -right-10 top-2.5 rounded-[14px] border border-gold/10 bg-navy-deep/60 px-[18px] py-3.5 backdrop-blur-[20px]"
        style={{ animation: "float-card 6s ease-in-out infinite" }}
      >
        <span className="block font-heading text-xl font-bold text-gold">8+</span>
        <span className="text-[11px] text-white/55">Career Fields</span>
      </div>
      <div
        className="absolute -left-[30px] bottom-[30px] rounded-[14px] border border-gold/10 bg-navy-deep/60 px-[18px] py-3.5 backdrop-blur-[20px]"
        style={{ animation: "float-card 6s ease-in-out infinite", animationDelay: "-2s" }}
      >
        <span className="block font-heading text-xl font-bold text-gold">15</span>
        <span className="text-[11px] text-white/55">Quiz Questions</span>
      </div>
      <div
        className="absolute -bottom-2.5 right-0 rounded-[14px] border border-gold/10 bg-navy-deep/60 px-[18px] py-3.5 backdrop-blur-[20px]"
        style={{ animation: "float-card 6s ease-in-out infinite", animationDelay: "-4s" }}
      >
        <span className="block font-heading text-xl font-bold text-gold">PDF</span>
        <span className="text-[11px] text-white/55">Download Results</span>
      </div>
    </div>
  );
}
