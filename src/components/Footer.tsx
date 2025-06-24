"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiTwitter } from "react-icons/fi";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const socialLinks = [
    { icon: <FiGithub />, href: "https://github.com/abrar898", label: "GitHub" },
    { icon: <FiLinkedin />, href: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
    { icon: <FiTwitter />, href: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: <FiMail />, href: "mailto:your.email@example.com", label: "Email" }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
    { name: "Hire Me", href: "#hire-me" }
  ];

  return (
    <footer className="relative border-t border-gray-800">
      {/* Footer top wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-full h-16 pointer-events-none">
        <svg
          className="w-full h-full text-black"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Muhammad Abrar Ahmad
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Full-stack developer passionate about creating beautiful and functional web experiences. 
              Focused on modern web technologies and user-centric design.
            </p>
            
            {/* Mobile Social Links */}
            <div className="flex flex-wrap gap-3 md:hidden mt-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  whileHover={{ y: -2 }}
                  aria-label={link.label}
                >
                  <span className="text-gray-400 hover:text-white">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-bold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links - Column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-bold text-white mb-4">More</h3>
            <ul className="space-y-2">
              {quickLinks.slice(3).map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  >
                    {link.name}
              </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/abrar898/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                >
                  Source Code
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="hidden md:flex flex-col"
          >
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
              <motion.a
                  key={index}
                  href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
                  whileHover={{ x: 2 }}
                  aria-label={link.label}
              >
                  <span className="p-1.5 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
              </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm text-center mb-4 sm:mb-0"
          >
            © {currentYear} MUHAMMAD ABRAR AHMAD. All rights reserved.
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full"
          >
            Back to Top
            <FiArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;