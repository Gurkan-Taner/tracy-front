"use client";

import { useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function AnimCount({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
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
