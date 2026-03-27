"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const quotes = [
    {
      av: "LF",
      name: "Léa Fontaine",
      role: "CTO, Meridian Labs",
      q: "We replaced three SaaS AI subscriptions with Tracy in a weekend. Our IP stays ours.",
    },
    {
      av: "MV",
      name: "Marcus Void",
      role: "Lead Infra, Arctis Security",
      q: "Air-gapped deployment was exactly what our compliance team needed. Tracy just works in isolation.",
    },
    {
      av: "YT",
      name: "Yuki Tanaka",
      role: "AI Engineer, Fluxion",
      q: "The API design is exceptional. PoC to production in 4 days. Zero surprises.",
    },
  ];
  return (
    <section className="relative bg-[#1b2c3c] py-32 overflow-hidden">
      <div className="mx-auto max-w-350 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-[#4e9ad0]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#4e9ad0]">
              Field reports
            </span>
          </div>
          <h2
            className="text-[clamp(40px,5vw,72px)] font-black leading-[0.92] tracking-[-0.03em] text-[#f2f2f2]"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            TEAMS WHO
            <br />
            <span className="text-[#235789]">TAKE IT SERIOUSLY.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border border-[#235789]/20 bg-[#19222a]/50 p-8 flex flex-col gap-6 hover:border-[#235789]/50 transition-all duration-300"
            >
              <div className="flex gap-0.5">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <svg
                      key={j}
                      className="h-3.5 w-3.5 text-[#4e9ad0]/60"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
              </div>
              <blockquote className="text-[#f2f2f2]/55 text-base leading-relaxed flex-1">
                &quot;{q.q}&quot;
              </blockquote>
              <div className="flex items-center gap-3 border-t border-[#235789]/20 pt-5">
                <div className="flex h-9 w-9 items-center justify-center bg-linear-to-br from-[#235789] to-[#204162] font-bold text-xs text-white">
                  {q.av}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#f2f2f2]">
                    {q.name}
                  </p>
                  <p className="text-xs text-[#f2f2f2]/30 font-mono">
                    {q.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
