"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FloatingInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  textArea?: boolean;
  rows?: number;
}

const FloatingInput = ({
  id,
  name,
  type,
  label,
  required = false,
  value,
  onChange,
  error,
  textArea = false,
  rows = 4,
}: FloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Check if the field should have a floating label
  const hasValue = value.trim().length > 0;
  const shouldFloat = isFocused || hasValue;

  // Handle click on the label to focus the input
  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const InputComponent = textArea ? 
    motion.textarea : 
    motion.input;

  return (
    <div className="relative mb-6 group">
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{
          background: isHovered
            ? "linear-gradient(90deg, rgba(59,130,246,0.08) 0%, rgba(147,51,234,0.08) 100%)"
            : "none",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating label */}
      <motion.label
        htmlFor={id}
        className="absolute left-3 text-gray-400 cursor-text pointer-events-none z-10"
        initial={false}
        animate={{
          y: shouldFloat ? -22 : 0,
          scale: shouldFloat ? 0.85 : 1,
          color: isFocused 
            ? "rgb(96, 165, 250)" 
            : error 
              ? "rgb(248, 113, 113)" 
              : "rgb(156, 163, 175)",
        }}
        transition={{
          y: { type: "spring", stiffness: 300, damping: 30 },
          scale: { type: "spring", stiffness: 300, damping: 30 },
          color: { duration: 0.2 },
        }}
        onClick={handleLabelClick}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </motion.label>

      {/* Input or Textarea */}
      <InputComponent
        ref={inputRef as any}
        type={type}
        id={id}
        name={name}
        value={value}
        rows={textArea ? rows : undefined}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`peer block w-full px-3 py-3 text-white bg-black/30 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
          error
            ? "border-red-500 focus:ring-red-500/30"
            : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
        }`}
        initial={false}
        animate={{
          boxShadow: isFocused 
            ? "0 0 0 2px rgba(59, 130, 246, 0.2)" 
            : error 
              ? "0 0 0 2px rgba(248, 113, 113, 0.2)" 
              : "none",
        }}
        transition={{ duration: 0.2 }}
        whileFocus={{ borderColor: "#3b82f6" }}
      />

      {/* Error message */}
      <AnimatedError error={error} />
    </div>
  );
};

// Animated error message component
const AnimatedError = ({ error }: { error?: string }) => {
  return (
    <motion.div
      className="min-h-6 mt-1"
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: error ? 1 : 0,
        height: error ? "auto" : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      {error && (
        <motion.p
          className="text-sm text-red-500 pl-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FloatingInput; 