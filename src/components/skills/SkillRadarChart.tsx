"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define skill categories and their details
const skillCategories = [
  {
    name: "Frontend",
    color: "#3B82F6", // blue-500
    skills: [
      { name: "React", proficiency: 90, experience: "4+ years", description: "Component-based UI development with hooks, context API, and Redux." },
      { name: "Next.js", proficiency: 85, experience: "3+ years", description: "Server-side rendering, static site generation, and API routes." },
      { name: "TypeScript", proficiency: 80, experience: "2+ years", description: "Type-safe JavaScript development with interfaces and generics." },
      { name: "Tailwind CSS", proficiency: 95, experience: "3+ years", description: "Utility-first CSS framework for rapid UI development." },
      { name: "Framer Motion", proficiency: 85, experience: "2+ years", description: "Production-ready animations for React applications." },
      { name: "ShadCN", proficiency: 85, experience: "2+ years", description: "Production-ready animations for React applications." }
    ]
  },
  {
    name: "Backend",
    color: "#8B5CF6", // purple-500
    skills: [
      { name: "Node.js", proficiency: 85, experience: "4+ years", description: "Server-side JavaScript with Express and REST APIs." },
      { name: "MongoDB", proficiency: 80, experience: "3+ years", description: "NoSQL database design and aggregation pipeline." },
      { name: "GraphQL", proficiency: 75, experience: "2+ years", description: "API query language with Apollo Server and Client." },
      { name: "PostgreSQL", proficiency: 70, experience: "2+ years", description: "Relational database design and optimization." },
      { name: "MySQL", proficiency: 70, experience: "2+ years", description: "Relational database design and optimization." },
      { name: "Firebase", proficiency: 80, experience: "3+ years", description: "Realtime database, authentication, and cloud functions." },
      { name: "Django", proficiency: 80, experience: "3+ years", description: "Realtime database, authentication, and cloud functions." },

    ]
  },
  {
    name: "DevOps",
    color: "#EC4899", // pink-500
    skills: [
      { name: "Docker", proficiency: 75, experience: "2+ years", description: "Containerization for consistent development environments." },
      { name: "GitHub Actions", proficiency: 80, experience: "2+ years", description: "CI/CD pipelines for automated testing and deployment." },
      { name: "AWS", proficiency: 65, experience: "1+ year", description: "Cloud infrastructure with EC2, S3, and Lambda." },
      { name: "Vercel", proficiency: 90, experience: "3+ years", description: "Deployment platform for frontend applications." },
      { name: "Netlify", proficiency: 85, experience: "2+ years", description: "Serverless deployment with continuous integration." },
      { name: "Postman", proficiency: 85, experience: "2+ years", description: "Serverless deployment with continuous integration." }
    ]
  },
  {
    name: "Design",
    color: "#10B981", // emerald-500
    skills: [
      { name: "Figma", proficiency: 85, experience: "3+ years", description: "Collaborative interface design and prototyping." },
      { name: "UI/UX", proficiency: 80, experience: "3+ years", description: "User-centered design with a focus on accessibility." },
      { name: "Responsive Design", proficiency: 95, experience: "4+ years", description: "Multi-device layout and design systems." },
      { name: "Animation", proficiency: 75, experience: "2+ years", description: "Micro-interactions and motion design principles." },
      { name: "Design Systems", proficiency: 70, experience: "2+ years", description: "Component libraries and design tokens." }
    ]
  }
];

const SkillRadarChart = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Calculate the coordinates for each point on the radar
  const getCoordinates = (index: number, radius: number, totalPoints: number) => {
    const angle = (Math.PI * 2 * index) / totalPoints - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  const handleCategoryChange = (category: React.SetStateAction<{
      name: string; color: string; // blue-500
      skills: { name: string; proficiency: number; experience: string; description: string; }[];
    }>) => {
    setActiveCategory(category);
    setHoveredSkill(null);
    setSelectedSkill(null);
  };
  
  const handleSkillClick = (skill: React.SetStateAction<null>) => {
    setSelectedSkill(selectedSkill === skill ? null : skill);
  };

  // Animation variants
  const skillPointVariants = {
    initial: { 
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0 
    },
    animate: (idx: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring",
        delay: idx * 0.1,
        duration: 0.5
      }
    }),
    hover: { 
      scale: 1.5,
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
    },
    selected: {
      scale: 1.8,
      boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)"
    }
  };

  const pathVariants = {
    initial: { 
      pathLength: 0,
      opacity: 0 
    },
    animate: {
      pathLength: 1,
      opacity: 0.6,
      transition: { 
        duration: 1.5,
        ease: "easeInOut" 
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl overflow-hidden bg-gray-900/40 backdrop-blur-sm p-6 border border-white/10">
      <motion.h2 
        className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Technical Proficiency
      </motion.h2>
      
      {/* Category tabs */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {skillCategories.map((category, idx) => (
          <motion.button
            key={category.name}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory.name === category.name
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Radar chart visualization */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* Background circles */}
            {[20, 40, 60, 80, 100].map((percentage, idx) => (
              <motion.div
                key={percentage}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                style={{
                  width: `${percentage}%`,
                  height: `${percentage}%`,
                  backgroundColor: percentage === 100 ? 'rgba(255,255,255,0.03)' : 'transparent'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { 
                    duration: 0.8, 
                    delay: 0.3 + (percentage / 500),
                    ease: "easeOut"
                  }
                }}
              />
            ))}
            
            {/* Connect the dots */}
            <motion.svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="-50 -50 100 100"
              style={{ transform: "rotate(-90deg)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.path
                d={activeCategory.skills
                  .map((skill, idx) => {
                    const totalSkills = activeCategory.skills.length;
                    const angle = (Math.PI * 2 * idx) / totalSkills;
                    const radius = (skill.proficiency / 100) * 40;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    return idx === 0 ? `M ${x},${y}` : `L ${x},${y}`;
                  })
                  .join(" ") + " Z"}
                fill={`${activeCategory.color}20`}
                stroke={activeCategory.color}
                strokeWidth="0.5"
                variants={pathVariants}
                initial="initial"
                animate="animate"
                key={activeCategory.name} // Force re-animation when category changes
              />
            </motion.svg>
            
            {/* Skill points */}
            <AnimatePresence>
              {activeCategory.skills.map((skill, idx) => {
                const totalSkills = activeCategory.skills.length;
                const { x, y } = getCoordinates(idx, (skill.proficiency / 100) * 48, totalSkills);
                
                return (
                  <motion.div
                    key={`${activeCategory.name}-${skill.name}`}
                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full cursor-pointer z-10"
                    custom={idx}
                    style={{
                      backgroundColor: activeCategory.color,
                      boxShadow: (hoveredSkill === skill || selectedSkill === skill) ? `0 0 15px ${activeCategory.color}` : 'none'
                    }}
                    variants={skillPointVariants}
                    initial="initial"
                    animate={selectedSkill === skill ? "selected" : "animate"}
                    whileHover="hover"
                    onClick={() => handleSkillClick(skill)}
                    exit={{ 
                      scale: 0, 
                      opacity: 0,
                      transition: { duration: 0.3 } 
                    }}
                  >
                    <motion.div
                      className={`absolute -top-1 -left-1 w-6 h-6 rounded-full ${
                        selectedSkill === skill ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ backgroundColor: `${activeCategory.color}30` }}
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: selectedSkill === skill ? [0.2, 0.5, 0.2] : 0
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Skill labels */}
            <AnimatePresence>
              {activeCategory.skills.map((skill, idx) => {
                const totalSkills = activeCategory.skills.length;
                const angle = (Math.PI * 2 * idx) / totalSkills - Math.PI / 2;
                const radius = 50;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                
                // Adjust text alignment based on position
                const textAnchor = x > 1 ? "start" : x < -1 ? "end" : "middle";
                const dy = y > 1 ? "1em" : y < -1 ? "-0.5em" : "0.3em";
                
                return (
                  <motion.div
                    key={`label-${skill.name}`}
                    className="absolute text-xs sm:text-sm font-medium whitespace-nowrap"
                    style={{
                      top: `${y + 50}%`,
                      left: `${x + 50}%`,
                      transform: "translate(-50%, -50%)",
                      textAlign: textAnchor === "start" ? "left" : textAnchor === "end" ? "right" : "center",
                      color: selectedSkill === skill ? activeCategory.color : (hoveredSkill === skill ? 'white' : '#9ca3af')
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: (hoveredSkill === skill || selectedSkill === skill) ? 1 : 0.7,
                      scale: (hoveredSkill === skill || selectedSkill === skill) ? 1.1 : 1,
                      y: (hoveredSkill === skill || selectedSkill === skill) ? -5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.name}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Skill details */}
        <div className="flex flex-col space-y-4">
          <motion.h3 
            className="text-xl font-bold text-center lg:text-left mb-2"
            style={{ color: activeCategory.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {activeCategory.name} Skills
          </motion.h3>
          
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="popLayout">
              {activeCategory.skills.map((skill, idx) => (
                <motion.div
                  key={`${activeCategory.name}-detail-${skill.name}`}
                  layout
                  className={`p-3 rounded-lg transition-all ${
                    hoveredSkill === skill || selectedSkill === skill
                      ? 'bg-white/10 border border-white/20 shadow-lg'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  initial={{ opacity: 0, x: 50, height: 0 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    height: 'auto',
                    transition: {
                      type: "spring",
                      delay: idx * 0.05,
                      duration: 0.5
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: -50, 
                    height: 0,
                    transition: { duration: 0.2 }
                  }}
                  whileHover={{ y: -2 }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-medium ${selectedSkill === skill ? 'text-white' : ''}`}>{skill.name}</span>
                    <span className="text-sm text-gray-300">{skill.experience}</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ backgroundColor: activeCategory.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ 
                        duration: 1.5, 
                        ease: "easeOut",
                        delay: idx * 0.1
                      }}
                    />
                  </div>
                  
                  <AnimatePresence>
                    {(hoveredSkill === skill || selectedSkill === skill || isExpanded) && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm text-gray-400 mt-2">{skill.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-center mt-2 px-4 py-2 text-sm rounded-full hover:bg-white/20 transition-colors"
            style={{ 
              backgroundColor: isExpanded ? `${activeCategory.color}40` : 'rgba(255,255,255,0.1)',
              color: isExpanded ? activeCategory.color : 'rgb(209,213,219)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {isExpanded ? "Collapse Details" : "Expand All Details"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
export default SkillRadarChart; 