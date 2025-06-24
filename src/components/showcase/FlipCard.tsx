"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Interface for tech stack items
interface TechItem {
  name: string;
  color: string;
}

// Interface for impact metrics
interface ImpactMetric {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

// Interface for the card data
export interface ProjectCardData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  techStack: TechItem[];
  impactMetrics?: ImpactMetric[]; // New field for metrics
}

interface FlipCardProps {
  project: ProjectCardData;
  onCardClick?: () => void;
  isRotating: boolean;
}

// Hover animation variants
const hoverVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }
};

// Link button variants
const buttonVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
  hover: { scale: 1.1, transition: { duration: 0.2 } }
};

// Tech badge variants
const techBadgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: (index) => ({ 
    scale: 1, 
    opacity: 1, 
    transition: { 
      delay: 0.1 * index,
      type: "spring",
      stiffness: 300,
      damping: 15
    } 
  }),
  hover: { y: -5, transition: { duration: 0.2 } }
};

// Animated counter component
const Counter = ({ from = 0, to, duration = 1.5, prefix = '', suffix = '' }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, latest => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(from);
  
  useEffect(() => {
    const controls = animate(count, to, {
      duration: duration,
      ease: "easeOut",
    });
    
    // Subscribe to value changes
    const unsubscribe = rounded.on("change", latest => {
      setDisplayValue(latest);
    });
    
    // Cleanup
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, to, duration, rounded]);
  
  return (
    <span>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const FlipCard = ({ project, onCardClick, isRotating }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // For tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth the spring animation with improved parameters
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 400, damping: 40 });
  
  // Glow effect based on mouse position
  const glowX = useTransform(x, [-100, 100], ["-20%", "120%"]);
  const glowY = useTransform(y, [-100, 100], ["-20%", "120%"]);

  // Check if mobile on first render
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (onCardClick) onCardClick();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || isFlipped) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to card center
    const xValue = e.clientX - rect.left - width / 2;
    const yValue = e.clientY - rect.top - height / 2;
    
    // Update motion values
    x.set(xValue);
    y.set(yValue);
  };

  const handleMouseLeave = () => {
    // Reset to center position when mouse leaves
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="w-full sm:w-80 h-96 perspective-1000 cursor-pointer relative"
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={hoverVariants}
      initial="idle"
      animate={isHovered && !isFlipped ? "hover" : "idle"}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-700 ease-out shadow-lg"
        style={{ 
          rotateX: isFlipped ? 0 : rotateX, 
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
          boxShadow: isHovered && !isFlipped ? "0 10px 30px rgba(0, 0, 0, 0.5)" : "0 5px 15px rgba(0, 0, 0, 0.3)"
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Use a nicer bezier curve
      >
        {/* Front of card */}
        <motion.div 
          className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Add subtle gradient overlay that moves with mouse */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 mix-blend-overlay"
                style={{
                  background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(59, 130, 246, 0.3), transparent 50%)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover opacity-80"
            />
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent"
              initial={{ y: 10, opacity: 0.8 }}
              animate={{ 
                y: isHovered ? 0 : 5, 
                opacity: isHovered ? 1 : 0.9 
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-xl font-bold text-white mb-2"
                initial={{ y: 5, opacity: 0.9 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  textShadow: isHovered ? "0 0 8px rgba(255,255,255,0.5)" : "none"
                }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>
              <motion.p 
                className="text-gray-200 line-clamp-2"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {project.description}
              </motion.p>
            </motion.div>
            
            {/* Rotating indicator */}
            {isRotating && (
              <motion.div 
                className="absolute top-4 right-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <motion.div 
                  className="w-3 h-3 rounded-full bg-green-500"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(34, 197, 94, 0.5)", "0 0 10px rgba(34, 197, 94, 0.8)"]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                ></motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Back of card */}
        <motion.div 
          className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-6"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <motion.h3 
                className="text-xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {project.title}
              </motion.h3>
              <motion.p 
                className="text-gray-300 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {project.description}
              </motion.p>
              
              {/* Impact Metrics */}
              <AnimatePresence>
                {isFlipped && project.impactMetrics && project.impactMetrics.length > 0 && (
                  <motion.div 
                    className="mt-4 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">PROJECT IMPACT</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.impactMetrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          className="bg-gray-700/50 p-2 rounded-lg text-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + (idx * 0.1), type: "spring" }}
                          whileHover={{ 
                            y: -5, 
                            backgroundColor: "rgba(59, 130, 246, 0.2)",
                            transition: { duration: 0.2 } 
                          }}
                        >
                          <p className="text-lg font-bold text-blue-400">
                            <Counter 
                              from={0} 
                              to={metric.value} 
                              prefix={metric.prefix || ''}
                              suffix={metric.suffix || ''}
                            />
                          </p>
                          <p className="text-xs text-gray-300">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {isFlipped && (
                  <motion.div 
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <motion.span 
                          key={idx} 
                          className={`text-xs px-2 py-1 rounded ${tech.color}`}
                          variants={techBadgeVariants}
                          initial="initial"
                          animate="animate"
                          whileHover="hover"
                          custom={idx}
                        >
                          {tech.name}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <AnimatePresence>
              {isFlipped && (
                <motion.div 
                  className="flex space-x-4 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <motion.a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <FaGithub className="mr-2" /> Code
                  </motion.a>
                  {project.demoUrl && (
                    <motion.a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      variants={buttonVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                    >
                      <FaExternalLinkAlt className="mr-2" /> Demo
                    </motion.a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard; 