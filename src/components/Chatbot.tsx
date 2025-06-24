"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiMessageSquare, FiChevronDown } from 'react-icons/fi';

const knowledgeBase = {
  skills: [
    "React & Next.js for frontend development",
    "Node.js and Express for backend",
    "TypeScript for type-safe coding",
    "MongoDB and PostgreSQL for databases",
    "AWS and Vercel for cloud deployment",
    "Docker for containerization",
    "TailwindCSS for styling",
    "Framer Motion for animations"
  ],
  projects: [
    "Portfolio Website - A modern, interactive showcase of my work built with Next.js and Framer Motion.",
    "E-Commerce Platform - Full-stack application with user authentication and payment integration.",
    "Weather App - Real-time weather forecasts with beautiful visualizations.",
    "Task Management App - Productivity tool with drag-and-drop functionality.",
    "Chat Application - Real-time messaging with private chats and file sharing."
  ],
  experience: [
    "4+ years of experience in full-stack web development",
    "Worked with startups and enterprise clients",
    "Developed e-commerce solutions handling thousands of transactions",
    "Created responsive, accessible web applications",
    "Optimized websites for performance and SEO",
    "Experience with agile methodologies and CI/CD pipelines"
  ],
  contact: "You can contact me at myemail@example.com or through the contact form on this website."
};

// Generate responses based on user input
const generateResponse = (message) => {
  const normalizedMessage = message.toLowerCase();
  
  if (normalizedMessage.includes("skills") || normalizedMessage.includes("can you") || normalizedMessage.includes("know")) {
    return {
      text: "Here are some of my key skills:",
      items: knowledgeBase.skills,
      delay: 500
    };
  } else if (normalizedMessage.includes("project") || normalizedMessage.includes("portfolio") || normalizedMessage.includes("work")) {
    return {
      text: "I've worked on these notable projects:",
      items: knowledgeBase.projects,
      delay: 600
    };
  } else if (normalizedMessage.includes("experience") || normalizedMessage.includes("background") || normalizedMessage.includes("worked")) {
    return {
      text: "My professional experience includes:",
      items: knowledgeBase.experience,
      delay: 700
    };
  } else if (normalizedMessage.includes("contact") || normalizedMessage.includes("email") || normalizedMessage.includes("reach")) {
    return {
      text: knowledgeBase.contact,
      delay: 400
    };
  } else if (normalizedMessage.includes("hello") || normalizedMessage.includes("hi") || normalizedMessage.includes("hey")) {
    return {
      text: "Hello! I'm Abrar's AI assistant. I can tell you about his skills, projects, and experience. What would you like to know?",
      delay: 300
    };
  } else {
    return {
      text: "I don't have specific information about that. Feel free to ask about my skills, projects, experience, or how to contact me.",
      delay: 500
    };
  }
};

const typingEffectDuration = 20; // ms per character for typing effect

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm Abrar's AI assistant. Ask me about his skills, projects, or experience.",
      sender: 'bot',
      isTyping: false,
      items: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      isTyping: false,
      items: []
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Generate bot response
    const response = generateResponse(inputValue);
    
    // Add typing indicator
    const typingTime = response.text.length * typingEffectDuration;
    
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        isTyping: true,
        items: response.items || []
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessage.id ? { ...msg, isTyping: false } : msg
          )
        );
        setIsTyping(false);
      }, typingTime);
    }, response.delay);
  };
  
  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-900/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMessageSquare className="w-6 h-6" />
        )}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-5 z-50 w-80 sm:w-96 h-96 bg-gray-900 rounded-xl shadow-xl flex flex-col overflow-hidden border border-white/10"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Chat header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center">
                <FiMessageSquare className="mr-2" />
                Abrar's Assistant
              </h3>
              <motion.button
                className="text-white/80 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
              >
                <FiX className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white/10 text-gray-100 rounded-tl-none'
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <>
                        <p>{message.text}</p>
                        {message.items && message.items.length > 0 && (
                          <motion.ul
                            className="mt-2 space-y-1 list-disc list-inside text-sm"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            {message.items.map((item, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                              >
                                {item}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-gray-800">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 p-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/5"
                  disabled={isTyping}
                />
                <motion.button
                  type="submit"
                  className={`p-2 rounded-lg ${
                    isTyping || !inputValue.trim()
                      ? 'bg-gray-600 text-gray-400'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isTyping || !inputValue.trim()}
                >
                  <FiSend className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
            
            {/* Hint */}
            <motion.div
              className="absolute left-4 bottom-20 px-3 py-1 bg-white/10 rounded-lg text-white/70 text-xs flex items-center cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ y: -2 }}
              onClick={() => setInputValue('What are your skills?')}
            >
              <FiChevronDown className="mr-1 w-3 h-3" />
              Try: "What are your skills?"
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 