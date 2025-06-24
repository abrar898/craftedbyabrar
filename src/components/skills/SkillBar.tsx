"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

export interface SkillProps {
  name: string;
  percentage: number;
  icon: IconType;
  description: string;
  category: 'Frontend' | 'Backend' | 'Tools' | string;
}

interface SkillBarProps {
  skill: SkillProps;
}

const SkillBar = ({ skill }: SkillBarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative mb-8 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-white/80">
            <skill.icon />
          </span>
          <h3 className="text-lg font-medium">{skill.name}</h3>
        </div>
        <span className="text-sm font-semibold">{skill.percentage}%</span>
      </div>
      
      <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.2
          }}
        />
      </div>
      
      {/* Hover description */}
      <motion.div
        className="absolute mt-2 bg-black/80 border border-white/10 p-3 rounded-lg text-sm z-10 backdrop-blur-sm w-full"
        initial={{ opacity: 0, y: 10, height: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 10,
          height: isHovered ? 'auto' : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <p>{skill.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default SkillBar; 