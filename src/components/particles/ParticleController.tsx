"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the ParticleBackground component to prevent SSR issues
const ParticleBackground = dynamic(
  () => import("./ParticleBackground"),
  { ssr: false }
);

interface ParticleControllerProps {
  particleCount?: number;
  particleSize?: number;
  particleColor?: string;
  lineColor?: string;
  connectDistance?: number;
  repulseDistance?: number;
  repulseStrength?: number;
  className?: string;
}

const ParticleController = ({
  particleCount = 80,
  particleSize = 2,
  particleColor,
  lineColor,
  connectDistance = 120,
  repulseDistance = 100,
  repulseStrength = 10,
  className = "",
}: ParticleControllerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if device is mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Adjust particle count for mobile devices
  const adjustedParticleCount = isMobile ? Math.round(particleCount / 3) : particleCount;

  if (!isMounted) return null;

  return (
    <ParticleBackground
      particleCount={adjustedParticleCount}
      particleSize={particleSize}
      particleColor={particleColor}
      lineColor={lineColor}
      connectDistance={connectDistance}
      repulseDistance={repulseDistance}
      repulseStrength={repulseStrength}
      className={className}
    />
  );
};

export default ParticleController; 