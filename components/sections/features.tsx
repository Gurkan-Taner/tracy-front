"use client";

import { useInView, motion } from "framer-motion";
import { useRef } from "react";

import HexGrid from "@/components/animations/hex-grid";

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cells = [
    {
      span: "lg:col-span-2 lg:row-span-2",
      tag: "01 — DEPLOY",
      title: "Your server.\nYour compute.\nFull stop.",
      desc: "Tracy runs on your infra — Docker, bare-metal, Kubernetes. No SaaS, no phone-home, no surprise bill.",
      code: "docker run -p 3000:3000 tracy/agent:latest",
      big: true,
    },
    {
      span: "",
      tag: "02 — KNOWLEDGE",
      title: "Private RAG engine",
      desc: "PDFs, Markdown, URLs, SQL — indexed and stored exclusively on your machine.",
      big: false,
    },
    {
      span: "",
      tag: "03 — SECURITY",
      title: "AES-256 + TLS 1.3",
      desc: "End-to-end encrypted. Everything at rest and in transit.",
      big: false,
    },
    {
      span: "",
      tag: "04 — API",
      title: "REST + WebSocket",
      desc: "Typed API. Stream responses. Manage sessions. Trigger tools.",
      big: false,
    },
    {
      span: "lg:col-span-2",
      tag: "05 — MODELS",
      title: "Bring any model. Switch anytime.",
      desc: "OpenAI, Anthropic, Mistral, local GGUF — wire once, swap freely. No lock-in by design.",
      big: false,
    },
    {
      span: "",
      tag: "06 — AIR-GAP",
      title: "Zero internet at runtime",
      desc: "Deploy in isolated networks. Compliance by architecture.",
      big: false,
    },
  ];

  return (
    <section
      id="features"
      className="relative bg-[#19222a] py-32 overflow-hidden"
    >
      <HexGrid />
      <div ref={ref} className="relative z-10 mx-auto max-w-350 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-[#4e9ad0]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#4e9ad0]">
                Capabilities
              </span>
            </div>
            <h2
              className="text-[clamp(40px,5vw,72px)] font-black leading-[0.92] tracking-[-0.03em] text-[#f2f2f2]"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              EVERYTHING
              <br />
              <span className="text-[#235789]">YOU NEED.</span>
            </h2>
          </div>
          <p className="hidden lg:block max-w-xs text-right text-sm text-[#f2f2f2]/35 leading-relaxed">
            No feature bloat. No lock-in. Tracy is surgical — every primitive
            exists so you retain total control.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-auto">
          {cells.map((cell, i) => (
            <motion.div
              key={cell.tag}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative border border-[#235789]/25 bg-[#1b2c3c]/50 hover:border-[#235789]/60 p-8 transition-all duration-500 overflow-hidden ${cell.span} ${i === 0 ? "border-[#4e9ad0]/30 bg-linear-to-br from-[#204162]/70 to-[#1b2c3c]" : ""}`}
            >
              <div className="absolute top-0 right-0 h-8 w-8 overflow-hidden">
                <div
                  className={`absolute top-0 right-0 h-0 w-0 border-t-32 border-r-32 ${i === 0 ? "border-t-[#4e9ad0]/25 border-r-transparent" : "border-t-[#235789]/15 border-r-transparent"}`}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#4e9ad0]/55 mb-4 block">
                {cell.tag}
              </span>
              <h3
                className={`font-black tracking-tight text-[#f2f2f2] whitespace-pre-line mb-4 leading-tight ${cell.big ? "text-4xl" : "text-xl"}`}
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                {cell.title}
              </h3>
              <p className="text-sm text-[#f2f2f2]/40 leading-relaxed">
                {cell.desc}
              </p>
              {cell.code && (
                <div className="mt-6 border border-[#235789]/30 bg-[#0a0f14]/80 px-4 py-3 font-mono text-xs text-[#4e9ad0]/70">
                  $ {cell.code}
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-br from-[#4e9ad0]/0 group-hover:from-[#4e9ad0]/4 to-transparent transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
