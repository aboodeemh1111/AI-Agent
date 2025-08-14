"use client";

import { motion } from "framer-motion";

export default function AnimatedOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute left-10 top-16 h-24 w-24 rounded-full bg-primary/30 blur-2xl"
        animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-16 top-24 h-28 w-28 rounded-full bg-fuchsia-500/25 blur-2xl"
        animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 left-1/3 h-20 w-20 rounded-full bg-cyan-400/25 blur-2xl"
        animate={{ y: [0, -8, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
