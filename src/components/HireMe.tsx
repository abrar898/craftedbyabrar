"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HireMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    timeline: '',
    projectType: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        budget: '',
        timeline: '',
        projectType: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  // Floating particles for background
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  }));
  
  return (
    <section id="hire-me" className="py-20 relative overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 z-0" />
      
      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl z-0"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side content */}
          <motion.div variants={itemVariants}>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Let's Build Something Amazing Together
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-6"
              variants={itemVariants}
            >
              I'm currently available for freelance work. If you have a project that needs some creative direction, development work, or a complete overhaul, let's chat about it!
            </motion.p>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              variants={itemVariants}
            >
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <h3 className="font-medium text-blue-400 mb-2">Rapid Development</h3>
                <p className="text-sm text-gray-300">Quick turnaround for your time-sensitive projects.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <h3 className="font-medium text-purple-400 mb-2">Modern Tech Stack</h3>
                <p className="text-sm text-gray-300">Using the latest technologies for optimal performance.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <h3 className="font-medium text-blue-400 mb-2">Clean Code</h3>
                <p className="text-sm text-gray-300">Well-structured codebase for future maintenance.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <h3 className="font-medium text-purple-400 mb-2">Responsive Design</h3>
                <p className="text-sm text-gray-300">Looks perfect on every device and screen size.</p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex flex-wrap gap-4 mb-6"
              variants={itemVariants}
            >
              <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded-full border border-blue-500/20">
                Next.js Development
              </span>
              <span className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full border border-purple-500/20">
                React Applications
              </span>
              <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded-full border border-blue-500/20">
                Full-Stack Projects
              </span>
              <span className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full border border-purple-500/20">
                UI/UX Improvements
              </span>
            </motion.div>
          </motion.div>
          
          {/* Right side contact form */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 relative overflow-hidden"
          >
            {/* Form success message */}
            {isSubmitted && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center p-6">
                  <svg 
                    className="w-16 h-16 text-white mx-auto mb-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-blue-100">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              </motion.div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-6">Tell me about your project</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                      <option value="">Select a range</option>
                      <option value="$1000-$3000">$1,000 - $3,000</option>
                      <option value="$3000-$5000">$3,000 - $5,000</option>
                      <option value="$5000-$10000">$5,000 - $10,000</option>
                      <option value="$10000+">$10,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-1">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                      <option value="">Select timeline</option>
                      <option value="Less than 1 month">Less than 1 month</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-1">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    <option value="">Select project type</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-70 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : "Send Message"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HireMe; 