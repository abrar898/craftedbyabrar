"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
}

const MagneticButton = ({
  children,
  className = "",
  href,
  strength = 40,
  onClick,
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Calculate the distance between mouse and button center on mousemove
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current) {
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        
        // Store button position
        setButtonPosition({
          x: left + width / 2,
          y: top + height / 2,
          width,
          height,
        });
        
        // Mouse position
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate distance between mouse and button center
  const distance = {
    x: mousePosition.x - buttonPosition.x,
    y: mousePosition.y - buttonPosition.y,
  };

  // Smoothly animate button position with spring physics
  const springConfig = { damping: 20, stiffness: 300 };
  const xMotion = useSpring(0, springConfig);
  const yMotion = useSpring(0, springConfig);

  // Update spring values based on hover state and mouse position
  useEffect(() => {
    if (isHovered) {
      xMotion.set(distance.x / strength);
      yMotion.set(distance.y / strength);
    } else {
      xMotion.set(0);
      yMotion.set(0);
    }
  }, [isHovered, distance.x, distance.y, xMotion, yMotion, strength]);

  // Handle mouse enter/leave events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    x: xMotion,
    y: yMotion,
  };

  const contentStyle = {
    x: useTransform(xMotion, (x) => x * 1.2),
    y: useTransform(yMotion, (y) => y * 1.2),
  };

  // Wrap with anchor tag if href is provided
  const ButtonComponent = href ? 
    (props: any) => <a href={href} target="_blank" rel="noopener noreferrer" {...props} /> :
    (props: any) => <div {...props} />;

  return (
    <ButtonComponent 
      className={`cursor-none hoverable ${className}`}
      onClick={onClick}
    >
      <motion.div
        ref={buttonRef}
        style={buttonStyle}
        className="relative flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div style={contentStyle}>
          {children}
        </motion.div>
      </motion.div>
    </ButtonComponent>
  );
};

export default MagneticButton; 