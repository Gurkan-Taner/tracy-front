"use client";

import { motion } from "framer-motion";

export default function GlitchText({
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
