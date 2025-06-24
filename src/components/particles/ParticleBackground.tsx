"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseColor: string;
  color: string;
  speedX: number;
  speedY: number;
  originalX: number;
  originalY: number;
  density: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  particleSize?: number;
  particleColor?: string;
  lineColor?: string;
  connectDistance?: number;
  repulseDistance?: number;
  repulseStrength?: number;
  className?: string;
}

const ParticleBackground = ({
  particleCount = 100,
  particleSize = 2,
  particleColor = "#3b82f6",
  lineColor = "rgba(255, 255, 255, 0.1)",
  connectDistance = 120,
  repulseDistance = 100,
  repulseStrength = 10,
  className = "",
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: repulseDistance,
  });
  const requestAnimationFrameRef = useRef<number>(0);
  const scrollYRef = useRef<number>(0);
  const hoverRef = useRef<boolean>(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const { resolvedTheme } = useTheme();

  // Calculate dynamic colors based on theme
  const getBaseColors = () => {
    const isDark = resolvedTheme === "dark";
    
    return {
      particleColor: particleColor || (isDark ? "#3b82f6" : "#2563eb"),
      lineColor: lineColor || (isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"),
      bgColor: isDark ? "#000000" : "#ffffff",
    };
  };

  // Initialize particles
  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const colors = getBaseColors();
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const size = (Math.random() * particleSize) + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 1;
      const speedY = (Math.random() - 0.5) * 1;
      const density = (Math.random() * 30) + 1;

      particles.push({
        x,
        y,
        size,
        baseColor: colors.particleColor,
        color: colors.particleColor,
        speedX,
        speedY,
        originalX: x,
        originalY: y,
        density,
      });
    }

    particlesRef.current = particles;
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
  };

  // Handle scroll
  const handleScroll = () => {
    scrollYRef.current = window.scrollY;
  };

  // Handle mouse enter/leave for hover state
  const handleMouseEnter = () => {
    hoverRef.current = true;
  };

  const handleMouseLeave = () => {
    hoverRef.current = false;
    mouseRef.current.x = null;
    mouseRef.current.y = null;
  };

  // Connect particles with lines if they are close enough
  const connectParticles = (ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current;
    
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectDistance) {
          ctx.beginPath();
          ctx.strokeStyle = getBaseColors().lineColor;
          ctx.lineWidth = 0.2;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  };

  // Create geometric patterns on hover
  const createGeometricPattern = (ctx: CanvasRenderingContext2D) => {
    if (!hoverRef.current || !mouseRef.current.x || !mouseRef.current.y) return;
    
    const particles = particlesRef.current;
    const cx = mouseRef.current.x;
    const cy = mouseRef.current.y;
    
    // Draw triangles between nearby particles and mouse position
    ctx.beginPath();
    ctx.strokeStyle = `rgba(59, 130, 246, ${Math.min(0.5, scrollYRef.current * 0.0005 + 0.1)})`;
    
    const connectedParticles = particles.filter(p => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < repulseDistance * 1.5;
    });
    
    if (connectedParticles.length >= 3) {
      for (let i = 0; i < connectedParticles.length - 2; i += 3) {
        const p1 = connectedParticles[i];
        const p2 = connectedParticles[i + 1];
        const p3 = connectedParticles[i + 2];
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
        gradient.addColorStop(0, `rgba(59, 130, 246, 0.1)`);
        gradient.addColorStop(1, `rgba(139, 92, 246, 0.1)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
        ctx.stroke();
      }
    }
  };

  // Update particles position and handle cursor interaction
  const updateParticles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scrollFactor = 1 + scrollYRef.current * 0.0001;
    
    // Change color based on scroll position
    const scrollHue = (scrollYRef.current * 0.05) % 360;
    
    for (const particle of particlesRef.current) {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Boundary check
      if (particle.x > canvas.width || particle.x < 0) {
        particle.speedX = -particle.speedX;
      }
      
      if (particle.y > canvas.height || particle.y < 0) {
        particle.speedY = -particle.speedY;
      }
      
      // Change color based on scroll
      if (scrollYRef.current > 0) {
        particle.color = `hsl(${scrollHue}, 70%, 50%)`;
      } else {
        particle.color = particle.baseColor;
      }
      
      // Handle cursor interaction
      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repulse when cursor approaches
        if (distance < repulseDistance) {
          const force = (-repulseStrength * particle.density) / distance;
          const directionX = dx / distance;
          const directionY = dy / distance;
          
          particle.x += directionX * force;
          particle.y += directionY * force;
        }
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * scrollFactor, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    }
    
    // Connect particles
    connectParticles(ctx);
    
    // Create geometric patterns on hover
    if (hoverRef.current) {
      createGeometricPattern(ctx);
    }
    
    // Request next frame
    requestAnimationFrameRef.current = requestAnimationFrame(updateParticles);
  };

  // Setup canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setCanvasSize({ width: canvas.width, height: canvas.height });
        initParticles();
      }
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvasSize({ width: canvas.width, height: canvas.height });
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    initParticles();
    updateParticles();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, []);

  // Update when theme changes
  useEffect(() => {
    if (particlesRef.current.length > 0) {
      const colors = getBaseColors();
      
      particlesRef.current.forEach(particle => {
        particle.baseColor = colors.particleColor;
        if (scrollYRef.current === 0) {
          particle.color = colors.particleColor;
        }
      });
    }
  }, [resolvedTheme, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground; 