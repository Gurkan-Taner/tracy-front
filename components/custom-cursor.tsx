"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

export default function CustomCursor() {
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
