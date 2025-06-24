// components/ProjectMetric.tsx
'use client';
import { motion, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface ProjectMetricProps {
  value: number;
  label: string;
  suffix?: string;
}

export default function ProjectMetric({ value, label, suffix = '' }: ProjectMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const spring = useSpring(isInView ? value : 0, {
    mass: 1,
    stiffness: 100,
    damping: 30
  });

  const animatedValue = useTransform(spring, (latest: number) => {
    return Math.round(latest) + suffix;
  }) as MotionValue<string>;

  return (
    <motion.div 
      ref={ref}
      className="p-4 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex flex-col items-center gap-2">
        <motion.span className="text-3xl font-bold text-primary">
          {animatedValue}
        </motion.span>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
    </motion.div>
  );
}