"use client";

import { motion } from "framer-motion";

interface AnimatedGreetingProps {
  greeting?: string;
  name?: string;
  role?: string;
}

const AnimatedGreeting = ({
  greeting = "Hello, I'm",
  name = "M Abrar Ahmad ",
  role = "Web Developer",
}: AnimatedGreetingProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center sm:items-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className="text-lg sm:text-xl text-gray-500 dark:text-gray-300"
        variants={itemVariants}
      >
        {greeting}
      </motion.p>
      <motion.h1
        className="text-4xl sm:text-6xl lg:text-7xl font-bold text-center sm:text-left mt-2"
        variants={itemVariants}
      >
        {name}
      </motion.h1>
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 w-16 mt-4 mb-4 sm:mb-6"
        variants={itemVariants}
      />
      <motion.p
        className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 text-center sm:text-left"
        variants={itemVariants}
      >
        {role}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedGreeting; 