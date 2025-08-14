"use client";

import { motion } from "framer-motion";

type NeonTitleProps = {
  title: string;
  subtitle?: string;
};

export default function NeonTitle({ title, subtitle }: NeonTitleProps) {
  return (
    <div className="relative">
      <motion.h2
        className="neon-text text-2xl sm:text-3xl font-semibold tracking-tight"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-sm text-muted-foreground mt-1"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
