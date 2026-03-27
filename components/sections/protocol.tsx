"use client";

import { motion } from "framer-motion";

export default function Protocol() {
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
