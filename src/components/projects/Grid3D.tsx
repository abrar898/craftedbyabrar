"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Grid3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridSize = 8; // Reduced grid size for better performance
  const gridSpacing = 100; // Spacing between grid lines in pixels
  
  // Mouse parallax effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height } = container.getBoundingClientRect();
      
      // Calculate mouse position relative to center (range -1 to 1)
      const x = (clientX / width - 0.5) * 2;
      const y = (clientY / height - 0.5) * 2;
      
      // Apply subtle rotation based on mouse position
      container.style.transform = `rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Generate grid lines
  const horizontalLines = Array.from({ length: gridSize + 1 }, (_, i) => {
    const position = (i * gridSpacing) - (gridSize * gridSpacing / 2);
    return { position, isVertical: false };
  });
  
  const verticalLines = Array.from({ length: gridSize + 1 }, (_, i) => {
    const position = (i * gridSpacing) - (gridSize * gridSpacing / 2);
    return { position, isVertical: true };
  });
  
  // Combine all lines
  const gridLines = [...horizontalLines, ...verticalLines];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
        style={{ 
          perspective: '2000px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div
          className="relative"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg) translateZ(-200px)'
          }}
        >
          {gridLines.map((line, index) => (
            <div
              key={index}
              className="absolute bg-blue-400"
              style={{
                width: line.isVertical ? '1px' : `${gridSize * gridSpacing}px`,
                height: line.isVertical ? `${gridSize * gridSpacing}px` : '1px',
                left: line.isVertical ? `${line.position}px` : '0',
                top: line.isVertical ? '0' : `${line.position}px`,
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid3D; 