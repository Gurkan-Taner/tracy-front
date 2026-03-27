"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

import HexGrid from "@/components/animations/hex-grid";

export default function Security() {
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
              Security in Tracy isn&apos;t a feature layer — it&apos;s the
              foundation every decision is built on. When your data never leaves
              your server, you don&apos;t need to trust us.
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
