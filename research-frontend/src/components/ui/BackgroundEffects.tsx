"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 background-grid opacity-[0.06] dark:opacity-[0.08]" />

      {/* Aurora blobs */}
      <motion.div
        className="absolute -top-24 -left-24 h-[50vh] w-[50vh] aurora rounded-full blur-3xl"
        initial={{ opacity: 0.2, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 h-[55vh] w-[55vh] aurora-2 rounded-full blur-3xl"
        initial={{ opacity: 0.15, scale: 0.9 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2.8, ease: "easeOut" }}
      />
    </div>
  );
}
