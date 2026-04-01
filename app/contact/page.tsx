"use client";

import { useActionState } from "react";
import { Mail, MapPin, Send, Instagram, Linkedin } from "lucide-react";
import PageHero from "@/components/page-hero";
import { sendContactEmail, type ContactFormState } from "./action";

const initialState: ContactFormState = { success: false, error: "" };

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(sendContactEmail, initialState);

  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Have a question, partnership idea, or want to bring a guest speaker? We'd love to hear from you."
      />
      <div className="mx-auto grid max-w-[1100px] items-start gap-10 px-6 pb-20 lg:grid-cols-2">
        <form
          action={formAction}
          className="rounded-[20px] border border-gold/[0.06] bg-white/[0.03] p-9"
        >
          {state.success && (
            <div className="mb-5 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
              Message sent! We&apos;ll get back to you soon.
            </div>
          )}
          {state.error && (
            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {state.error}
            </div>
          )}
          <div className="mb-4 grid gap-3.5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-white/55 font-heading tracking-wide">Name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-gold/40" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/55 font-heading tracking-wide">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@email.com" className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-gold/40" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-white/55 font-heading tracking-wide">Subject</label>
            <input id="subject" name="subject" type="text" required placeholder="What's this about?" className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-gold/40" />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-white/55 font-heading tracking-wide">Message</label>
            <textarea id="message" name="message" required rows={5} placeholder="Write your message here..." className="w-full resize-y rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-gold/40" />
          </div>
          <button type="submit" disabled={pending} className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-gold px-5 py-3.5 font-heading text-[15px] font-bold text-navy-deep transition-all hover:bg-gold-light disabled:opacity-60 cursor-pointer disabled:cursor-default">
            <Send size={16} />
            {pending ? "Sending..." : "Send Message"}
          </button>
        </form>
        <div className="pt-2">
          <h2 className="mb-2 font-heading text-xl font-bold tracking-tight sm:text-2xl">Other Ways to Reach Us</h2>
          <p className="mb-8 text-[0.95rem] font-light leading-relaxed text-white/55">Whether you want to partner, volunteer, or just say hello — we&apos;re here.</p>
          <div className="mb-9 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/10 bg-gold/[0.08]">
                <Mail size={18} className="text-gold" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.06em] text-white/55 font-medium">Email</span>
                <p className="text-[0.9rem]">contact@careercompass.org</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/10 bg-gold/[0.08]">
                <MapPin size={18} className="text-gold" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.06em] text-white/55 font-medium">Location</span>
                <p className="text-[0.9rem]">Orlando, Florida</p>
              </div>
            </div>
          </div>
          <p className="mb-3.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">Follow Us</p>
          <div className="flex gap-2.5">
            <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.06] bg-white/[0.04] text-white/55 transition-all hover:border-gold/20 hover:bg-gold/[0.06] hover:text-gold cursor-pointer">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.06] bg-white/[0.04] text-white/55 transition-all hover:border-gold/20 hover:bg-gold/[0.06] hover:text-gold cursor-pointer">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
