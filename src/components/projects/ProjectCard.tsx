"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export type Tag = {
  name: string;
  color: string;
};

// Add language statistics type
export type LanguageStat = {
  name: string;
  percentage: number;
  color: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: Tag[];
  demoUrl?: string;
  githubUrl?: string;
  detailedDescription?: string;
  languageStats?: LanguageStat[]; // Add language statistics
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  
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

  const handleCardClick = () => {
    // Trigger flip animation
    setIsFlipping(true);
    
    // Wait for flip animation before opening modal (shorter wait time)
    setTimeout(() => {
      onClick(); // Open the modal directly
      // Reset the flip state after the modal opens
      setTimeout(() => {
        setIsFlipping(false);
      }, 100);
    }, 200);
  };

  return (
    <motion.div
      className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 cursor-pointer hoverable"
      whileHover={{ 
        scale: 1.03,
        borderColor: "rgba(255, 255, 255, 0.2)",
        y: -5,
        boxShadow: "0 10px 30px -15px rgba(0, 0, 255, 0.3)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        // Use CSS transform string for the flip animation instead of rotateY
        transform: isFlipping ? "rotateY(90deg)" : "rotateY(0deg)"
      }}
      transition={{ 
        duration: 0.3,
        type: "spring", 
        stiffness: 300, 
        damping: 20
      }}
      exit={{ opacity: 0, y: 20 }}
      onClick={handleCardClick}
      style={{ 
        perspective: "1000px",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden"
      }}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className={`${getTagStyles(tag.color)} text-xs px-2.5 py-0.5 rounded-full`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;