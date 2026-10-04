"use client";
import { motion, useScroll, useSpring } from "motion/react";

// Four stacked CMYK lines that fill as the page scrolls
export default function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 grid h-1">
      {["#00AEEF", "#EC008C", "#FFF200", "#14151A"].map((c) => (
        <motion.div key={c} style={{ scaleX: x, background: c, transformOrigin: "0 50%" }} className="col-start-1 row-start-1 h-1" />
      ))}
    </div>
  );
}