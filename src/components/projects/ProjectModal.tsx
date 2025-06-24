"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "./ProjectCard";
import { useEffect } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Define tag background colors based on the tag color
  const getTagStyles = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-500/20 text-blue-500",
      green: "bg-green-500/20 text-green-500",
      purple: "bg-purple-500/20 text-purple-500",
      red: "bg-red-500/20 text-red-500",
      yellow: "bg-yellow-500/20 text-yellow-600",
      indigo: "bg-indigo-500/20 text-indigo-500",
      pink: "bg-pink-500/20 text-pink-500",
      teal: "bg-teal-500/20 text-teal-500",
    };
    
    return colorMap[color] || "bg-gray-500/20 text-gray-500";
  };

  // Get progress bar color based on language color
  const getProgressBarColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      indigo: "bg-indigo-500",
      pink: "bg-pink-500",
      teal: "bg-teal-500",
    };
    
    return colorMap[color] || "bg-gray-500";
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-black/80 border border-white/10 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto perspective-1000"
            initial={{ scale: 0.9, opacity: 0, transform: "rotateY(90deg)" }}
            animate={{ scale: 1, opacity: 1, transform: "rotateY(0deg)" }}
            exit={{ scale: 0.9, opacity: 0, transform: "rotateY(-90deg)" }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 260,
              duration: 0.5 
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-full h-64 sm:h-80">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
              />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hoverable"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`${getTagStyles(tag.color)} text-xs px-2.5 py-0.5 rounded-full`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              
              <div className="text-gray-200 mb-6 space-y-4">
                {/* <p>{project.description}</p> */}
                {project.detailedDescription && (
                  <p className="text-gray-300">{project.detailedDescription}</p>
                )}
              </div>
              
              {/* Language Statistics */}
              {project.languageStats && project.languageStats.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Languages & Technologies</h3>
                  <div className="space-y-3">
                    {project.languageStats.map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{stat.name}</span>
                          <span className="text-sm font-medium">{stat.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <motion.div 
                            className={`h-2.5 rounded-full ${getProgressBarColor(stat.color)}`}
                            style={{ width: 0 }}
                            animate={{ width: `${stat.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mt-6">
                {/* Only show demo button if project has a demo URL */}
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm hoverable flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Live Demo
                  </motion.a>
                )}
                
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg border border-white/20 text-white font-medium text-sm hoverable flex items-center"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.49C9.34 21.581 9.532 21.272 9.532 21.008C9.532 20.768 9.522 19.882 9.518 19.052C6.736 19.591 6.14 17.726 6.14 17.726C5.672 16.612 5.02 16.305 5.02 16.305C4.12 15.687 5.09 15.7 5.09 15.7C6.08 15.771 6.63 16.738 6.63 16.738C7.52 18.277 8.97 17.775 9.55 17.52C9.638 16.914 9.89 16.491 10.17 16.255C7.97 16.017 5.65 15.183 5.65 11.477C5.65 10.387 6.06 9.493 6.65 8.787C6.55 8.537 6.19 7.577 6.75 6.187C6.75 6.187 7.59 5.917 9.5 7.221C10.29 7 11.15 6.89 12 6.88C12.85 6.89 13.71 7 14.5 7.221C16.41 5.917 17.25 6.187 17.25 6.187C17.81 7.577 17.45 8.537 17.35 8.787C17.94 9.493 18.35 10.387 18.35 11.477C18.35 15.193 16.03 16.013 13.82 16.245C14.17 16.533 14.5 17.114 14.5 17.996C14.5 19.177 14.49 20.674 14.49 21.003C14.49 21.26 14.68 21.574 15.19 21.473C19.158 20.16 22 16.407 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
                    </svg>
                    GitHub
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 