"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function Compass() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [needleAngle, setNeedleAngle] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(0.06);
  const animFrame = useRef<number>(0);
  const targetAngle = useRef(0);
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentAngle = useRef(0);
  const currentTilt = useRef({ x: 0, y: 0 });

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Needle points toward cursor
      targetAngle.current = Math.atan2(dx, -dy) * (180 / Math.PI);

      // 3D tilt based on cursor distance from center
      const maxTilt = 15;
      const distX = Math.max(-1, Math.min(1, dx / (rect.width * 1.5)));
      const distY = Math.max(-1, Math.min(1, dy / (rect.height * 1.5)));
      targetTilt.current = { x: -distY * maxTilt, y: distX * maxTilt };

      // Glow intensifies when cursor is near
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(window.innerWidth, window.innerHeight);
      const proximity = 1 - Math.min(dist / (maxDist * 0.4), 1);
      setGlowIntensity(0.06 + proximity * 0.35);
    }

    function animate() {
      // Smooth interpolation
      currentAngle.current = lerp(currentAngle.current, targetAngle.current, 0.08);
      currentTilt.current = {
        x: lerp(currentTilt.current.x, targetTilt.current.x, 0.06),
        y: lerp(currentTilt.current.y, targetTilt.current.y, 0.06),
      };

      setNeedleAngle(currentAngle.current);
      setTilt({ x: currentTilt.current.x, y: currentTilt.current.y });

      animFrame.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove);
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame.current);
    };
  }, [lerp]);

  // Check reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const compassTransform = prefersReducedMotion
    ? undefined
    : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

  return (
    <div
      ref={containerRef}
      className="relative h-[380px] w-[380px] lg:h-[440px] lg:w-[440px]"
      style={{
        transform: compassTransform,
        transition: "none",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute -inset-8 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(201,168,76,${glowIntensity}) 0%, transparent 70%)`,
          transition: "background 0.3s",
        }}
      />

      {/* Tick ring — outermost with many tick marks */}
      <div
        className="absolute -inset-3 rounded-full"
        style={{ animation: "spin-slow 90s linear infinite" }}
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-0 origin-[50%_calc(50%+var(--r))]"
            style={{
              ["--r" as string]: `${(440 + 24) / 2}px`,
              transform: `translateX(-50%) rotate(${i * 10}deg)`,
              width: i % 9 === 0 ? "2px" : "1px",
              height: i % 9 === 0 ? "14px" : "8px",
              background: i % 9 === 0 ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)",
              transformOrigin: `50% ${(440 + 24) / 2}px`,
            }}
          />
        ))}
      </div>

      {/* Ring 1 — outer */}
      <div
        className="absolute inset-0 rounded-full border-2 border-gold/[0.12]"
        style={{ animation: "spin-slow 60s linear infinite" }}
      >
        <span className="absolute -top-[1px] left-1/2 h-4 w-[2px] -translate-x-1/2 bg-gold/50" />
        <span className="absolute -bottom-[1px] left-1/2 h-4 w-[2px] -translate-x-1/2 bg-gold/50" />
        <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-gold/30" />
        <span className="absolute right-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-gold/30" />
      </div>

      {/* Ring 2 */}
      <div
        className="absolute inset-6 rounded-full border border-gold/[0.08]"
        style={{ animation: "spin-slow 45s linear infinite reverse" }}
      />

      {/* Ring 3 — degree markings feel */}
      <div className="absolute inset-12 rounded-full border border-gold/[0.18]" />

      {/* Glass center */}
      <div
        className="absolute inset-[65px] flex flex-col items-center justify-center rounded-full border border-gold/[0.15]"
        style={{
          background: "radial-gradient(circle at 40% 35%, rgba(45,95,138,0.35), rgba(34,74,111,0.2) 60%, rgba(14,31,51,0.4))",
          backdropFilter: "blur(30px) saturate(150%)",
          boxShadow: `
            0 0 ${40 + glowIntensity * 200}px rgba(201,168,76,${glowIntensity}),
            inset 0 0 60px rgba(34,74,111,0.3),
            inset 0 -20px 40px rgba(201,168,76,0.03)
          `,
        }}
      >
        {/* Inner ring detail */}
        <div className="absolute inset-3 rounded-full border border-gold/[0.06]" />

        {/* Needle — follows cursor */}
        <div
          className="relative h-[120px] w-1"
          style={{
            transform: prefersReducedMotion ? undefined : `rotate(${needleAngle}deg)`,
            transition: prefersReducedMotion ? undefined : "none",
          }}
        >
          {/* North needle (gold) */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderBottom: "58px solid #C9A84C",
              filter: `drop-shadow(0 0 ${12 + glowIntensity * 30}px rgba(201,168,76,${0.4 + glowIntensity}))`,
            }}
          />
          {/* South needle (dim) */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "48px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>

        {/* Center dot with pulse */}
        <div className="absolute flex items-center justify-center">
          <div
            className="absolute h-8 w-8 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(201,168,76,${0.3 + glowIntensity}) 0%, transparent 70%)`,
              animation: "badge-pulse 3s ease-in-out infinite",
            }}
          />
          <div className="h-4 w-4 rounded-full bg-gold shadow-[0_0_24px_rgba(201,168,76,0.5)]" />
        </div>
      </div>

      {/* Cardinal points */}
      <span className="absolute top-[42px] left-1/2 -translate-x-1/2 font-heading text-sm font-bold text-gold tracking-widest">
        N
      </span>
      <span className="absolute bottom-[42px] left-1/2 -translate-x-1/2 font-heading text-sm font-bold text-gold/40 tracking-widest">
        S
      </span>
      <span className="absolute right-[42px] top-1/2 -translate-y-1/2 font-heading text-sm font-bold text-gold/40 tracking-widest">
        E
      </span>
      <span className="absolute left-[42px] top-1/2 -translate-y-1/2 font-heading text-sm font-bold text-gold/40 tracking-widest">
        W
      </span>

      {/* Floating stat cards — parallax offset from tilt */}
      <div
        className="absolute -right-14 top-0 rounded-[14px] border border-gold/10 bg-navy-deep/70 px-5 py-4 backdrop-blur-[20px]"
        style={{
          animation: "float-card 6s ease-in-out infinite",
          transform: `translate(${tilt.y * 0.5}px, ${tilt.x * 0.3}px)`,
        }}
      >
        <span className="block font-heading text-2xl font-bold text-gold">8+</span>
        <span className="text-[11px] text-white/55">Career Fields</span>
      </div>
      <div
        className="absolute -left-12 bottom-[20px] rounded-[14px] border border-gold/10 bg-navy-deep/70 px-5 py-4 backdrop-blur-[20px]"
        style={{
          animation: "float-card 6s ease-in-out infinite",
          animationDelay: "-2s",
          transform: `translate(${tilt.y * -0.4}px, ${tilt.x * -0.3}px)`,
        }}
      >
        <span className="block font-heading text-2xl font-bold text-gold">15</span>
        <span className="text-[11px] text-white/55">Quiz Questions</span>
      </div>
      <div
        className="absolute -bottom-6 right-4 rounded-[14px] border border-gold/10 bg-navy-deep/70 px-5 py-4 backdrop-blur-[20px]"
        style={{
          animation: "float-card 6s ease-in-out infinite",
          animationDelay: "-4s",
          transform: `translate(${tilt.y * 0.3}px, ${tilt.x * 0.5}px)`,
        }}
      >
        <span className="block font-heading text-2xl font-bold text-gold">PDF</span>
        <span className="text-[11px] text-white/55">Download Results</span>
      </div>
    </div>
  );
}
