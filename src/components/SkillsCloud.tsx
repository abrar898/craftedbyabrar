"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  x: number;
  y: number;
  size: number;
}

const defaultSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Node.js",
  "Mongodb",
  "PostgreSQL",
  "Django",
  "REST API",
  "Github"
];

interface SkillsCloudProps {
  skills?: string[];
}

const SkillsCloud = ({ skills = defaultSkills }: SkillsCloudProps) => {
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Initial setup and window resize handling
    const updateDimensions = () => {
      const container = document.getElementById("skills-container");
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Randomize positions when dimensions change
        const newSkillsData = skills.map((skill) => ({
          name: skill,
          x: Math.random() * 0.6 * width,
          y: Math.random() * 0.6 * height,
          size: Math.random() * 0.5 + 0.8, // Scale between 0.8 and 1.3
        }));
        
        setSkillsData(newSkillsData);
      }
    };

    // Set initial dimensions
    updateDimensions();

    // Add resize event listener
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [skills]);

  return (
    <div 
      id="skills-container" 
      className="relative w-full h-[300px] md:h-[400px] mt-12 overflow-hidden"
    >
      {skillsData.map((skill, index) => (
        <motion.div
          key={index}
          className="absolute px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 backdrop-blur-sm text-sm md:text-base font-medium cursor-pointer transition-colors duration-300 hoverable"
          initial={{ x: skill.x, y: skill.y, scale: skill.size }}
          animate={{
            x: skill.x + Math.sin(Date.now() / 1000) * 20,
            y: skill.y + Math.cos(Date.now() / 2000) * 20,
            scale: skill.size,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3 + Math.random() * 2,
            ease: "easeInOut",
          }}
          whileHover={{ scale: skill.size * 1.2 }}
        >
          {skill.name}
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsCloud; 