"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LiveTerminal() {
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
