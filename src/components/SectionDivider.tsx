"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className = "" }: SectionDividerProps) => {
  return (
    <motion.div
      className={`w-full max-w-4xl mx-auto h-16 flex items-center justify-center ${className}`}
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
};

export default SectionDivider; 