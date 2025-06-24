"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiSun, FiMoon } from 'react-icons/fi';

type ThemeType = 'light' | 'dark';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('dark');

  // Only run after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeType || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Handle scroll changes to add background on scroll - only after mounting
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Update active section based on scroll position
      const sections = ['home', 'projects', 'skills', 'contact', 'blog', 'hire-me'];
      
      // Find the section that is currently most visible in the viewport
      let mostVisibleSection: string | null = null;
      let maxVisibility = 0;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Calculate how much of the section is visible in the viewport
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          const visibility = Math.max(0, visibleHeight / element.offsetHeight);
          
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            mostVisibleSection = section;
          }
        }
      }
      
      if (mostVisibleSection && mostVisibleSection !== activeLink) {
        setActiveLink(mostVisibleSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial active section
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, activeLink, mounted]);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    const newTheme: ThemeType = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [theme]);

  // Smooth scroll function
  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Navbar height + padding
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
    
    setActiveLink(sectionId);
  }, []);

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + custom * 0.1,
        type: "spring",
        stiffness: 300
      }
    }),
    hover: { 
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 500 
      }
    }
  };
  
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const mobileItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.2 }
    }
  };

  // Theme toggle animation variants
  const themeToggleVariants = {
    initial: { scale: 0.5, opacity: 0, rotate: -30 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    exit: { scale: 0.5, opacity: 0, rotate: 30 },
    hover: { scale: 1.15, rotate: 5 }
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'Projects', href: 'projects' },
    { name: 'Skills', href: 'skills' },
    { name: 'Contact', href: 'contact' },
    { name: 'Hire Me', href: 'hire-me', highlight: true }
  ];

  // If not mounted yet, return null to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/70 dark:bg-black/70 backdrop-blur-md shadow-lg shadow-black/20' 
          : 'bg-transparent dark:bg-transparent backdrop-blur-sm border-b border-blue-100/30 dark:border-transparent'
      }`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/" 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            Abrar
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
              animate={{ width: activeLink === 'home' ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ width: '0%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation - Now centered */}
        <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
          <div className="flex items-center space-x-8">
            {navLinks.map((link, idx) => (
              <motion.button 
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative ${
                  activeLink === link.href 
                    ? 'text-blue-700 font-semibold dark:text-white' 
                    : 'text-blue-600/90 dark:text-white/80'
                } transition-colors ${
                  link.highlight ? 'px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all' : ''
                }`}
                variants={navItemVariants}
                custom={idx}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onMouseEnter={() => setHoverLink(link.href)}
                onMouseLeave={() => setHoverLink(null)}
              >
                {link.name}
                {!link.highlight && (
                  <>
                    {/* Active indicator */}
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: activeLink === link.href ? '100%' : '0%',
                        opacity: activeLink === link.href ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Hover indicator (shows only when not active) */}
                    {activeLink !== link.href && (
                      <motion.span 
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-600/50"
                        initial={{ width: '0%', opacity: 0 }}
                        animate={{ 
                          width: hoverLink === link.href ? '100%' : '0%',
                          opacity: hoverLink === link.href ? 0.7 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </>
                )}
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="mr-4 p-2 rounded-full bg-blue-50/40 dark:bg-gray-800/30 hover:bg-blue-100/50 dark:hover:bg-gray-700/50 transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.div
                key="moon"
                variants={themeToggleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
              >
                <FiSun className="w-5 h-5 text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                variants={themeToggleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
              >
                <FiMoon className="w-5 h-5 text-blue-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu Toggle */}
        <motion.button 
          className="md:hidden text-blue-700 dark:text-white focus:outline-none relative z-20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed top-[68px] left-0 right-0 bg-white/80 dark:bg-black/90 backdrop-blur-md border-b border-blue-100 dark:border-white/10 z-10"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="py-4 px-6 flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <motion.button 
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-left py-2 relative ${
                    link.highlight 
                      ? 'px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white'
                      : activeLink === link.href 
                        ? 'text-blue-700 font-semibold dark:text-white' 
                        : 'text-blue-600/90 dark:text-white/80 hover:text-blue-800 dark:hover:text-white'
                  }`}
                  variants={mobileItemVariants}
                  custom={idx}
                >
                  <span className="relative">
                    {link.name}
                    {!link.highlight && activeLink === link.href && (
                      <motion.span 
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                        layoutId="mobileActiveIndicator"
                      />
                    )}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar; 