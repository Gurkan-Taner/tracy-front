"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   TRACY — "SOVEREIGN MACHINE" EDITION
   Direction : éditorial brutaliste × terminal de guerre froide × typo massive.
   Rien de générique. Chaque pixel a une intention.
───────────────────────────────────────────────────────────────────────────── */

// ─── CURSOR PERSONNALISÉ ────────────────────────────────────────────────────
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      setHovered(!!(e.target as HTMLElement).closest("a,button,[data-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-999 rounded-full border border-[#4e9ad0] mix-blend-difference hidden md:block"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          width: hovered ? 48 : 12,
          height: hovered ? 48 : 12,
          backgroundColor: hovered ? "transparent" : "#4e9ad0",
          transition: "width 0.2s, height 0.2s, background-color 0.2s",
        }}
      />
    </>
  );
}

// ─── SCAN LINE ───────────────────────────────────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 z-100 h-px bg-linear-to-r from-transparent via-[#4e9ad0]/30 to-transparent"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── HEX GRID ────────────────────────────────────────────────────────────────
function HexGrid() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
    >
      <defs>
        <pattern
          id="hexPattern"
          x="0"
          y="0"
          width="56"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="28,2 54,16 54,48 28,62 2,48 2,16"
            fill="none"
            stroke="#4e9ad0"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexPattern)" />
    </svg>
  );
}

// ─── GLITCH TEXT ─────────────────────────────────────────────────────────────
function GlitchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-[#4e9ad0] select-none"
        animate={{ x: [0, -3, 2, 0], opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 5 }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-[#235789] select-none"
        animate={{ x: [0, 3, -1, 0], opacity: [0, 0.6, 0] }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 5,
          delay: 0.06,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimCount({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const tick = () => {
      v += Math.ceil((to - v) / 8);
      setVal(v >= to ? to : v);
      if (v < to) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ─── LIVE TERMINAL ────────────────────────────────────────────────────────────
function LiveTerminal() {
  const lines = [
    { t: 0, c: "dim", s: "tracy@srv:~$", v: " init --sovereign" },
    { t: 550, c: "ok", s: "✓", v: " Runtime isolated — no egress configured" },
    { t: 1050, c: "ok", s: "✓", v: " Knowledge base mounted (3.2 GB)" },
    {
      t: 1600,
      c: "info",
      s: "[AES-256]",
      v: " Encrypting embeddings at rest...",
    },
    { t: 2100, c: "ok", s: "✓", v: " 48,391 vectors indexed locally" },
    { t: 2700, c: "warn", s: "[BLOCK]", v: " Outbound call attempt — dropped" },
    { t: 3100, c: "ok", s: "✓", v: " API server listening on :3000" },
    {
      t: 3700,
      c: "hi",
      s: "TRACY",
      v: " Agent online. Zero data leaves your perimeter. ✓",
    },
  ];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    lines.forEach((l, i) => setTimeout(() => setVisible(i + 1), l.t));
  }, []);
  const colors: Record<string, string> = {
    dim: "text-[#f2f2f2]/30",
    ok: "text-emerald-400",
    info: "text-[#4e9ad0]",
    warn: "text-amber-400",
    hi: "text-[#f2f2f2] font-bold",
  };
  return (
    <div className="border border-[#235789]/50 bg-[#0a0f14]">
      <div className="flex items-center justify-between border-b border-[#235789]/30 px-5 py-2.5">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#235789]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#235789]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#235789]/30" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#235789]">
          TRACY // BOOT SEQUENCE
        </span>
        <div className="flex items-center gap-1.5">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-emerald-400"
          />
          <span className="font-mono text-[10px] text-emerald-400/70 uppercase tracking-widest">
            LIVE
          </span>
        </div>
      </div>
      <div className="p-5 font-mono text-[13px] leading-7 min-h-65">
        {lines.slice(0, visible).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex gap-3"
          >
            <span className={`shrink-0 w-20 text-right ${colors[l.c]}`}>
              {l.s}
            </span>
            <span className="text-[#f2f2f2]/60">{l.v}</span>
          </motion.div>
        ))}
        {visible < lines.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block h-4 w-2.5 bg-[#4e9ad0] ml-1 align-middle"
          />
        )}
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#19222a]/90 backdrop-blur-2xl border-b border-[#235789]/20" : ""}`}
    >
      <div className="mx-auto flex max-w-350 items-center justify-between px-8 py-5">
        <a href="#" className="flex items-center gap-3">
          <svg viewBox="0 0 36 36" fill="none" className="h-9 w-9">
            <polygon
              points="18,2 34,10 34,26 18,34 2,26 2,10"
              stroke="#235789"
              strokeWidth="1"
              fill="#1b2c3c"
            />
            <polygon
              points="18,8 28,13.5 28,22.5 18,28 8,22.5 8,13.5"
              stroke="#4e9ad0"
              strokeWidth="0.8"
              fill="none"
            />
            <text
              x="18"
              y="22"
              textAnchor="middle"
              fill="#4e9ad0"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              T
            </text>
          </svg>
          <span className="font-black tracking-[0.15em] text-[#f2f2f2] uppercase text-sm">
            TRACY
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-10">
          {["Features", "Protocol", "Security", "Docs"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#f2f2f2]/35 hover:text-[#4e9ad0] transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#deploy"
          data-hover
          className="hidden md:flex items-center gap-3 border border-[#235789] px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[#4e9ad0] hover:bg-[#235789] hover:text-white transition-all duration-300"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            ⬡
          </motion.span>
          Log in
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#f2f2f2]/60 text-xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-[#235789]/20 bg-[#19222a]/95 backdrop-blur-xl px-8 py-6 flex flex-col gap-5"
          >
            {["Features", "Protocol", "Security", "Docs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#f2f2f2]/50 hover:text-[#4e9ad0]"
              >
                {item}
              </a>
            ))}
            <a
              href="#deploy"
              className="border border-[#235789] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#4e9ad0] text-center"
            >
              Deploy now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
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
            className="hidden lg:block"
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
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-[#235789]/20 bg-[#0d1318]/60 backdrop-blur-sm">
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
      </div>
    </section>
  );
}

// ─── FEATURES BENTO ──────────────────────────────────────────────────────────
function Features() {
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

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function Protocol() {
  const steps = [
    {
      n: "01",
      title: "Install Tracy",
      sub: "One command. Full stack.",
      desc: "Tracy bootstraps the DB, vector store and API server. First agent running in minutes, not days.",
      code: "npx create-tracy-agent my-agent\ncd my-agent\ntracy dev",
    },
    {
      n: "02",
      title: "Feed your knowledge base",
      sub: "Private. Indexed. Sovereign.",
      desc: "Drop PDFs, Markdown, URLs or raw SQL. Tracy chunks, embeds and indexes entirely on your machine.",
      code: "tracy ingest ./contracts/**/*.pdf\ntracy ingest https://internal.wiki",
    },
    {
      n: "03",
      title: "Query. Integrate. Own.",
      sub: "Full API. Your rules.",
      desc: "Your agent is live behind a typed REST + WebSocket API. Every answer — your data, your model, your server.",
      code: 'curl -X POST https://srv/api/chat \\\n  -H "Authorization: Bearer $KEY" \\\n  -d \'{"message":"Summarize Q3"}\'',
    },
  ];

  return (
    <section
      id="protocol"
      className="relative bg-[#1b2c3c] py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-350 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex items-center gap-6"
        >
          <div className="h-px w-12 bg-[#4e9ad0]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#4e9ad0]">
            Protocol
          </span>
        </motion.div>

        <div className="flex flex-col divide-y divide-[#235789]/20">
          {steps.map((s) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="group grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr] gap-8 lg:gap-16 py-14 hover:bg-[#19222a]/30 transition-colors duration-500 px-4 -mx-4"
            >
              <div className="flex items-start">
                <span
                  className="font-black text-[80px] leading-none tracking-tighter text-[#235789]/25 group-hover:text-[#235789]/50 transition-colors duration-500 select-none"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {s.n}
                </span>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#4e9ad0]/55">
                  {s.sub}
                </span>
                <h3
                  className="text-3xl font-black tracking-tight text-[#f2f2f2] leading-tight"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-[#f2f2f2]/40 text-sm leading-relaxed max-w-sm">
                  {s.desc}
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-full border border-[#235789]/30 bg-[#0a0f14]/80">
                  <div className="border-b border-[#235789]/20 px-4 py-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#235789]/50" />
                    <span className="h-2 w-2 rounded-full bg-[#235789]/30" />
                    <span className="font-mono text-[10px] text-[#235789]/40 ml-2 uppercase tracking-widest">
                      terminal
                    </span>
                  </div>
                  <pre className="p-5 font-mono text-[13px] text-[#f2f2f2]/60 leading-relaxed overflow-x-auto whitespace-pre">
                    {s.code}
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECURITY ─────────────────────────────────────────────────────────────────
function Security() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      id="security"
      ref={ref}
      className="relative bg-[#19222a] py-32 overflow-hidden"
    >
      <HexGrid />
      <motion.div
        style={{ x }}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
      >
        <span
          className="text-[28vw] font-black tracking-tighter text-[#1b2c3c] leading-none whitespace-nowrap"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          SECURE
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-350 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-12 bg-[#4e9ad0]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#4e9ad0]">
                Security
              </span>
            </div>
            <h2
              className="text-[clamp(40px,5vw,72px)] font-black leading-[0.92] tracking-[-0.03em] text-[#f2f2f2] mb-8"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              BUILT
              <br />
              <span className="text-[#235789]">PARANOID</span>.<br />
              DEPLOYED
              <br />
              CONFIDENT.
            </h2>
            <p className="text-[#f2f2f2]/40 leading-relaxed max-w-md">
              Security in Tracy isn&apos;t a feature layer — it&apos;s the foundation
              every decision is built on. When your data never leaves your
              server, you don&apos;t need to trust us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            {[
              {
                icon: "⬡",
                title: "Data never leaves your server",
                desc: "Zero SaaS processing. Your documents, conversations and embeddings stay on your infrastructure. Mathematically impossible to leak.",
              },
              {
                icon: "⬡",
                title: "AES-256 at rest + TLS 1.3 in transit",
                desc: "All stored data encrypted with AES-256-GCM. All traffic secured with TLS 1.3. mTLS supported for zero-trust networks.",
              },
              {
                icon: "⬡",
                title: "RBAC + full audit trail",
                desc: "Fine-grained roles, API key rotation and a tamper-evident log of every interaction.",
              },
              {
                icon: "⬡",
                title: "Air-gapped compatible",
                desc: "No internet at runtime. Works on isolated networks with local LLMs (Llama, Mistral GGUF). Compliance by architecture.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="group flex gap-5 border border-[#235789]/20 bg-[#1b2c3c]/40 p-6 hover:border-[#4e9ad0]/30 hover:bg-[#1b2c3c]/70 transition-all duration-300"
              >
                <span className="text-[#4e9ad0] text-xl mt-0.5 shrink-0">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-bold text-[#f2f2f2] mb-1.5 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#f2f2f2]/38 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="flex flex-wrap gap-2 mt-1">
              {[
                "GDPR ready",
                "HIPAA compatible",
                "ISO 27001 aligned",
                "No telemetry",
              ].map((b) => (
                <span
                  key={b}
                  className="font-mono text-[10px] uppercase tracking-widest text-[#4e9ad0]/55 border border-[#235789]/30 px-3 py-1.5"
                >
                  ✓ {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
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

// ─── CTA ──────────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      id="deploy"
      className="relative bg-[#19222a] py-40 overflow-hidden"
    >
      <HexGrid />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-175 w-175 rounded-full bg-[#235789]/20 blur-[160px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-350 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-10"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-[#4e9ad0]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#4e9ad0]">
              Open source · Free forever · MIT
            </span>
            <div className="h-px w-12 bg-[#4e9ad0]" />
          </div>
          <h2
            className="text-[clamp(52px,9vw,130px)] font-black leading-[0.88] tracking-[-0.04em] text-[#f2f2f2]"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            <GlitchText>OWN</GlitchText> YOUR
            <br />
            <span className="text-[#235789]">INTELLIGENCE.</span>
          </h2>
          <p className="max-w-lg text-[#f2f2f2]/40 text-lg leading-relaxed">
            No subscription. No black box. No data harvesting. Tracy is yours —
            fork it, extend it, run it forever on your terms.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com"
              data-hover
              className="group relative overflow-hidden border-2 border-[#4e9ad0] px-12 py-5 font-mono text-sm uppercase tracking-[0.2em] text-[#4e9ad0] transition-all duration-500 hover:text-[#19222a]"
            >
              <motion.span
                className="absolute inset-0 bg-[#4e9ad0] origin-bottom"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative z-10">⬡ Deploy Tracy →</span>
            </a>
            <a
              href="#"
              data-hover
              className="border border-[#235789]/40 px-12 py-5 font-mono text-sm uppercase tracking-[0.2em] text-[#f2f2f2]/35 hover:border-[#235789] hover:text-[#f2f2f2]/75 transition-all duration-300"
            >
              Read the docs
            </a>
          </div>
          <div className="border border-[#235789]/30 bg-[#0a0f14]/80 px-8 py-4 font-mono text-sm text-[#4e9ad0]/65">
            <span className="text-[#235789]/50 mr-3">$</span>npx
            create-tracy-agent my-first-agent
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0d1318] border-t border-[#235789]/20">
      <div className="mx-auto max-w-350 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 36 36" fill="none" className="h-8 w-8">
            <polygon
              points="18,2 34,10 34,26 18,34 2,26 2,10"
              stroke="#235789"
              strokeWidth="1"
              fill="#1b2c3c"
            />
            <polygon
              points="18,8 28,13.5 28,22.5 18,28 8,22.5 8,13.5"
              stroke="#4e9ad0"
              strokeWidth="0.8"
              fill="none"
            />
            <text
              x="18"
              y="22"
              textAnchor="middle"
              fill="#4e9ad0"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              T
            </text>
          </svg>
          <span className="font-black tracking-[0.15em] text-[#f2f2f2]/50 uppercase text-sm">
            TRACY
          </span>
          <span className="text-[#235789] mx-1">·</span>
          <span className="font-mono text-xs text-[#f2f2f2]/20">
            Your AI, your infra.
          </span>
        </div>
        <div className="flex items-center gap-8">
          {["GitHub", "Docs", "Discord", "Privacy"].map((l) => (
            <a
              key={l}
              href="#"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#f2f2f2]/20 hover:text-[#4e9ad0] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <p className="font-mono text-[10px] text-[#235789]/40 uppercase tracking-widest">
          MIT · No telemetry · Ever.
        </p>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
/*
  NEXT.JS SETUP REQUIS :

  1. npm install framer-motion

  2. Dans layout.tsx, ajoute dans <head> :
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

  3. Metadata SEO (layout.tsx ou page.tsx) :
     export const metadata = {
       title: "Tracy — Deploy Your Own AI Agent. Your Server. Your Rules.",
       description: "Open-source AI agent framework. Self-hosted, end-to-end encrypted, model agnostic. Zero data leaks.",
       keywords: ["self-hosted AI agent","private AI framework","deploy AI agent","knowledge base AI","secure LLM","RAG self-hosted","air-gapped AI","Tracy framework"],
       openGraph: { title: "Tracy — Your AI, Your Server", type: "website", url: "https://tracy.sh" },
       twitter: { card: "summary_large_image" },
       robots: { index: true, follow: true },
       alternates: { canonical: "https://tracy.sh" },
     };

  4. JSON-LD dans layout.tsx :
     <script type="application/ld+json">{JSON.stringify({
       "@context":"https://schema.org","@type":"SoftwareApplication",
       "name":"Tracy","applicationCategory":"DeveloperApplication",
       "operatingSystem":"Linux,macOS,Windows",
       "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
       "description":"Self-hosted AI agent framework. Private RAG, REST API, AES-256.",
       "featureList":["Self-hosted","Private knowledge base","REST API","AES-256","Air-gap"],
       "url":"https://tracy.sh"
     })}</script>
*/

export default function TracyPage() {
  return (
    <div
      className="min-h-screen bg-[#19222a] antialiased selection:bg-[#235789] selection:text-white"
      style={{ fontFamily: "'DM Sans',sans-serif", cursor: "none" }}
    >
      <CustomCursor />
      <ScanLine />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Protocol />
        <Security />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
