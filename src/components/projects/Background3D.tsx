"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Shape types for the 3D background
interface Shape {
  x: number;
  y: number;
  size: number;
  color: string;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  translateZ: number;
  delay: number;
}

const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate random shapes data
  const generateShapes = (count: number): Shape[] => {
    const shapes: Shape[] = [];
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];
    
    for (let i = 0; i < count; i++) {
      shapes.push({
        x: Math.random() * 100, // random position as percentage
        y: Math.random() * 100,
        size: Math.random() * 20 + 10, // random size between 10 and 30
        color: colors[Math.floor(Math.random() * colors.length)],
        rotateX: Math.random() * 360,
        rotateY: Math.random() * 360,
        rotateZ: Math.random() * 360,
        translateZ: Math.random() * -500 - 100, // random depth between -100 and -600
        delay: Math.random() * 5, // random animation delay
      });
    }
    
    return shapes;
  };
  
  // Generate 15 random shapes - reduced for better performance
  const shapes = generateShapes(10);
  
  // Mouse parallax effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height } = container.getBoundingClientRect();
      
      // Calculate mouse position as percentage of container
      const x = (clientX / width - 0.5) * 2; // -1 to 1
      const y = (clientY / height - 0.5) * 2; // -1 to 1
      
      // Update shape transforms based on mouse position
      const shapes = container.querySelectorAll('.shape');
      shapes.forEach((shape) => {
        const depth = parseFloat(shape.getAttribute('data-depth') || '0');
        const transformX = x * depth * 10;
        const transformY = y * depth * 10;
        
        shape.setAttribute('style', 
          `transform: translate3d(${transformX}px, ${transformY}px, 0) 
           ${shape.getAttribute('data-original-transform')}`
        );
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {shapes.map((shape, index) => {
        // Create static transform string
        const initialTransform = `rotateX(${shape.rotateX}deg) rotateY(${shape.rotateY}deg) rotateZ(${shape.rotateZ}deg) translateZ(${shape.translateZ}px)`;
        
        return (
          <motion.div
            key={index}
            className="shape absolute rounded-lg opacity-20"
            data-depth={(Math.abs(shape.translateZ) / 600).toFixed(2)}
            data-original-transform={initialTransform}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              transformStyle: 'preserve-3d',
              transform: initialTransform,
            }}
            // Use a simpler animation that won't cause unit conversion issues
            animate={{
              transform: [
                initialTransform,
                `rotateX(${shape.rotateX + 360}deg) rotateY(${shape.rotateY + 360}deg) rotateZ(${shape.rotateZ + 360}deg) translateZ(${shape.translateZ}px)`
              ]
            }}
            transition={{
              duration: 20 + shape.delay * 5,
              ease: "linear",
              repeat: Infinity,
              delay: shape.delay,
            }}
          />
        );
      })}
    </div>
  );
};

export default Background3D; 