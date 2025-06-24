"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "A" || 
          (e.target as HTMLElement).tagName === "BUTTON" ||
          (e.target as HTMLElement).closest("a") ||
          (e.target as HTMLElement).closest("button") ||
          (e.target as HTMLElement).classList.contains("hoverable")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1,
    },
    hovering: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 2,
      borderColor: "rgba(255, 255, 255, 0.8)",
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
  };

  // Don't show cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-white bg-white bg-opacity-25 pointer-events-none z-50 mix-blend-difference"
      variants={variants}
      animate={isHovering ? "hovering" : "default"}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      ref={cursorRef}
    />
  );
};

export default CustomCursor; 