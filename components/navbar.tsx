"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
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
