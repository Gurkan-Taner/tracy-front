"use client";

import { motion } from "framer-motion";

export default function ScanLine() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 z-100 h-px bg-linear-to-r from-transparent via-[#4e9ad0]/30 to-transparent"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
  );
}
