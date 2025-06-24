"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import FlipCard, { ProjectCardData } from './FlipCard';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ProjectGalleryProps {
  projects: ProjectCardData[];
  autoRotateInterval?: number; // in milliseconds
}

export default function ProjectGallery({ 
  projects, 
  autoRotateInterval = 5000 
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1279px)');
  
  const visibleCards = isMobile ? 1 : isTablet ? 2 : 3;
  const limitedProjects = projects.slice(0, 9); // Limit to 9 projects initially
  const displayedProjects = showAllProjects ? projects : limitedProjects;
  
  // Handle auto-rotation (only on desktop and when in carousel mode)
  useEffect(() => {
    if (isMobile || showAllProjects) return;
    
    startAutoRotate();
    
    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [activeIndex, isMobile, showAllProjects]);
  
  const startAutoRotate = () => {
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
    }
    
    autoRotateTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayedProjects.length);
    }, autoRotateInterval);
  };
  
  const pauseAutoRotate = () => {
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }
  };
  
  const handleNext = () => {
    pauseAutoRotate();
    setActiveIndex((prev) => (prev + 1) % displayedProjects.length);
    if (!isMobile && !showAllProjects) startAutoRotate();
  };
  
  const handlePrev = () => {
    pauseAutoRotate();
    setActiveIndex((prev) => (prev - 1 + displayedProjects.length) % displayedProjects.length);
    if (!isMobile && !showAllProjects) startAutoRotate();
  };
  
  const handleCardClick = (index: number) => {
    pauseAutoRotate();
    setActiveIndex(index);
    if (!isMobile && !showAllProjects) startAutoRotate();
  };

  const toggleShowAllProjects = () => {
    pauseAutoRotate();
    setShowAllProjects(prev => !prev);
  };
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (showAllProjects) return; // Disable swipe in grid view
    
    const touchDiff = touchStartX.current - touchEndX.current;
    
    // Minimum distance to be considered a swipe
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        // Swipe left
        handleNext();
      } else {
        // Swipe right
        handlePrev();
      }
    }
  };
  
  // Calculate indices for cards to display in carousel mode
  const getVisibleIndices = () => {
    const indices = [];
    const halfVisible = Math.floor(visibleCards / 2);
    
    for (let i = -halfVisible; i <= halfVisible; i++) {
      if (visibleCards % 2 === 0 && i === halfVisible) continue;
      
      const index = (activeIndex + i + displayedProjects.length) % displayedProjects.length;
      indices.push(index);
    }
    
    return indices;
  };

  return (
    <div className="relative w-full py-10 overflow-hidden">
      {/* Toggle button for show all/less */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={toggleShowAllProjects}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAllProjects ? 'Show Less' : 'Show All GitHub Projects'}
        </motion.button>
      </div>
      
      {/* Grid view when showing all projects */}
      {showAllProjects ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <FlipCard
                project={project}
                onCardClick={() => {}}
                isRotating={false}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // Carousel view when showing limited projects
        <div 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex justify-center items-center">
            <AnimatePresence mode="popLayout">
              <div className="relative flex justify-center items-center gap-4 md:gap-8">
                {getVisibleIndices().map((index) => {
                  const distance = ((index - activeIndex + displayedProjects.length) % displayedProjects.length);
                  const distanceFromActive = Math.min(
                    distance, 
                    displayedProjects.length - distance
                  );
                  
                  return (
                    <motion.div
                      key={displayedProjects[index].id}
                      className="relative"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: index === activeIndex ? 1 : 0.85,
                        opacity: 1,
                        x: (index - activeIndex) * (isMobile ? 0 : 20)
                      }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <FlipCard
                        project={displayedProjects[index]}
                        onCardClick={() => handleCardClick(index)}
                        isRotating={index === activeIndex}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              aria-label="Previous project"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
            
            <div className="flex gap-2 items-center">
              {displayedProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-2.5 h-2.5 rounded-full focus:outline-none transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              aria-label="Next project"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 