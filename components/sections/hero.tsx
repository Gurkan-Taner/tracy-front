"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import HexGrid from "@/components/animations/hex-grid";
import AnimCount from "@/components/animations/anim-count";
import GlitchText from "@/components/animations/glitch-text";
import LiveTerminal from "@/components/sections/live-terminal";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#19222a] flex items-center"
      aria-label="Hero"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <HexGrid />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,#4e9ad0 2px,#4e9ad0 3px)",
            backgroundSize: "100% 4px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-225 w-225 rounded-full bg-[#204162]/20 blur-[160px]" />
        <div className="absolute top-0 right-0 h-125 w-125 bg-[#235789]/10 blur-[120px]" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-350 px-8 pt-32 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-center">
          {/* LEFT */}
          <motion.div style={{ y: titleY }} className="flex flex-col gap-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-px w-12 bg-[#4e9ad0]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#4e9ad0]">
                Framework · Open source · Self-hosted
              </span>
            </motion.div>

            <h1
              className="flex flex-col leading-[0.88] tracking-[-0.04em]"
              style={{ fontFamily: "'Syne','DM Sans',sans-serif" }}
            >
              {[
                { w: "DEPLOY", c: "text-[#f2f2f2]" },
                { w: "YOUR", c: "text-[#235789]" },
                { w: "AGENT.", c: "text-[#f2f2f2]" },
              ].map(({ w, c }, i) => (
                <motion.span
                  key={w}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`block overflow-hidden font-black text-[clamp(64px,9.5vw,140px)] ${c}`}
                >
                  <GlitchText>{w}</GlitchText>
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-10 max-w-lg text-[17px] leading-relaxed text-[#f2f2f2]/50 font-light"
            >
              Build production-grade AI agents. Host them on{" "}
              <em className="not-italic text-[#f2f2f2]/90 font-medium">
                your own server
              </em>
              . Private knowledge base, full REST API, end-to-end encryption.{" "}
              <em className="not-italic text-[#4e9ad0] font-medium">
                Zero data leaves your perimeter.
              </em>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#deploy"
                data-hover
                className="group relative overflow-hidden border border-[#4e9ad0] px-10 py-4 font-mono text-sm uppercase tracking-[0.2em] text-[#4e9ad0] transition-all duration-500 hover:text-[#19222a]"
              >
                <motion.span
                  className="absolute inset-0 bg-[#4e9ad0] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="relative z-10">Get started →</span>
              </a>
              <a
                href="#protocol"
                data-hover
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#f2f2f2]/30 hover:text-[#f2f2f2]/70 transition-colors underline underline-offset-4 decoration-[#235789]"
              >
                See how it works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mt-14 flex gap-10 border-t border-[#235789]/20 pt-8"
            >
              {[
                { n: 2400, s: "+", l: "GitHub stars" },
                { n: 100, s: "%", l: "Self-hosted" },
                { n: 0, s: "", l: "Data leaks" },
              ].map(({ n, s, l }) => (
                <div key={l} className="flex flex-col gap-0.5">
                  <span className="font-black text-3xl tracking-tighter text-[#f2f2f2]">
                    <AnimCount to={n} suffix={s} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2f2f2]/30">
                    {l}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <LiveTerminal />
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { k: "Runtime", v: "Isolated" },
                { k: "Egress", v: "Blocked" },
                { k: "Encrypt", v: "AES-256" },
                { k: "Model", v: "Agnostic" },
              ].map(({ k, v }) => (
                <div
                  key={k}
                  className="border border-[#235789]/30 bg-[#1b2c3c]/40 px-4 py-2.5 flex justify-between items-center"
                >
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#f2f2f2]/30">
                    {k}
                  </span>
                  <span className="font-mono text-[11px] text-[#4e9ad0]">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ticker tape */}
      {/* <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-[#235789]/20 bg-[#0d1318]/60 backdrop-blur-sm">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap py-3"
        >
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="mx-8 font-mono text-[11px] uppercase tracking-[0.3em] text-[#235789]"
              >
                SELF-HOSTED &nbsp;·&nbsp; PRIVATE KNOWLEDGE BASE &nbsp;·&nbsp;
                FULL REST API &nbsp;·&nbsp; AES-256 ENCRYPTION &nbsp;·&nbsp;
                ZERO VENDOR LOCK-IN &nbsp;·&nbsp; MODEL AGNOSTIC &nbsp;·&nbsp;
                AIR-GAP READY &nbsp;·&nbsp;
              </span>
            ))}
        </motion.div>
      </div> */}
    </section>
  );
}
