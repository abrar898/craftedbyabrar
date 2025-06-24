"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillBar, { SkillProps } from './SkillBar';
import  SkillRadarChart  from './SkillRadarChart';
import { 
  FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaGitAlt,
  FaNpm, FaFigma, FaDatabase, FaAws
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, 
  SiExpress, SiMongodb, SiPostgresql, SiJest, SiAmazon,SiPostman,SiDjango, SiPhp
} from 'react-icons/si';
import { RiBarChartHorizontalLine, RiRadarLine } from 'react-icons/ri';

// Skills data
const skillsData: SkillProps[] = [
  {
    name: 'React',
    percentage: 90,
    icon: FaReact,
    description: 'Advanced knowledge of React, including hooks, context API, and performance optimization. Experience with class and functional components.',
    category: 'Frontend'
  },
  {
    name: 'Next.js',
    percentage: 85,
    icon: SiNextdotjs,
    description: 'Strong experience with Next.js, including SSR, SSG, ISR, API routes, and middleware. Familiar with the App Router and Server Components.',
    category: 'Frontend'
  },
  {
    name: 'TypeScript',
    percentage: 80,
    icon: SiTypescript,
    description: 'Proficient in TypeScript, including type definitions, interfaces, generics, and advanced type utilities.',
    category: 'Frontend'
  },
  {
    name: 'JavaScript',
    percentage: 95,
    icon: SiJavascript,
    description: 'Expert knowledge of JavaScript, including ES6+ features, async/await, promises, and functional programming concepts.',
    category: 'Frontend'
  },
  {
    name: 'Tailwind CSS',
    percentage: 90,
    icon: SiTailwindcss,
    description: 'Advanced knowledge of Tailwind CSS, including custom configurations, plugins, and responsive design principles.',
    category: 'Frontend'
  },
  {
    name: 'HTML5',
    percentage: 95,
    icon: FaHtml5,
    description: 'Expert knowledge of HTML5, including semantic markup, accessibility, and SEO best practices.',
    category: 'Frontend'
  },
  {
    name: 'CSS3',
    percentage: 85,
    icon: FaCss3Alt,
    description: 'Strong understanding of CSS3, including Flexbox, Grid, animations, and responsive design.',
    category: 'Frontend'
  },
  {
    name: 'Node.js',
    percentage: 80,
    icon: FaNodeJs,
    description: 'Proficient in Node.js for backend development, including file system operations, streams, and event-driven architecture.',
    category: 'Backend'
  },
  {
    name: 'Express',
    percentage: 75,
    icon: SiExpress,
    description: 'Experienced with Express.js for building RESTful APIs, middleware, and routing.',
    category: 'Backend'
  },
  {
    name: 'MongoDB',
    percentage: 70,
    icon: SiMongodb,
    description: 'Good understanding of MongoDB, including CRUD operations, aggregation pipeline, and Mongoose ODM.',
    category: 'Backend'
  },
  {
    name: 'PostgreSQL',
    percentage: 65,
    icon: SiPostgresql,
    description: 'Working knowledge of PostgreSQL, including SQL queries, indexing, and database design.',
    category: 'Backend'
  },
  {
    name: 'RESTful APIs',
    percentage: 85,
    icon: FaDatabase,
    description: 'Strong experience designing and implementing RESTful APIs, including authentication, rate limiting, and error handling.',
    category: 'Backend'
  },
  {
    name: 'Git',
    percentage: 85,
    icon: FaGitAlt,
    description: 'Proficient with Git version control, including branching strategies, merge conflict resolution, and Git workflows.',
    category: 'Tools'
  },
  {
    name: 'Docker',
    percentage: 70,
    icon: FaDocker,
    description: 'Good understanding of Docker, including containers, images, Docker Compose, and containerization best practices.',
    category: 'Tools'
  },
  {
    name: 'AWS',
    percentage: 65,
    icon: SiAmazon,
    description: 'Working knowledge of AWS services like S3, EC2, Lambda, and CloudFront for cloud deployment and hosting.',
    category: 'Tools'
  },
  { name: 'Postman',
    percentage: 95, 
    icon: SiPostman, 
    description: 'Expert in API testing and automation using Postman.',
    category: 'Tools' },

  { name: 'phpMyAdmin',
    percentage: 90, 
    icon: SiPhp, 
    description: 'Skilled in using phpMyAdmin for managing MySQL databases.', 
    category: 'Tools' },

  {
    name: 'Jest',
    percentage: 75,
    icon: SiJest,
    description: 'Experienced with Jest for unit and integration testing, including mocks, spies, and testing asynchronous code.',
    category: 'Tools'
  },
  {
    name: 'npm',
    percentage: 90,
    icon: FaNpm,
    description: 'Advanced knowledge of npm for package management, including dependency management and publishing packages.',
    category: 'Tools'
  },
  
  { name: 'Django', 
  percentage: 95, 
  icon: SiDjango, 
  description: 'Advanced Django skills including ORM, views, authentication, and admin.', 
  category: 'Backend' },
  { name: 'Django REST Framework', 
  percentage: 93, 
  icon: SiDjango, 
  description: 'Expert in building APIs with Django REST Framework...', 
  category: 'Backend' },
  {
    name: 'Figma',
    percentage: 80,
    icon: FaFigma,
    description: 'Proficient with Figma for UI/UX design, prototyping, and collaboration with designers.',
    category: 'Tools'
  }
];

// Filter button component
interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton = ({ active, onClick, children }: FilterButtonProps) => (
  <motion.button
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-white/10 ${
      active ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-black/20 text-white/70'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

// Toggle button component
interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ToggleButton = ({ active, onClick, icon, label }: ToggleButtonProps) => (
  <motion.button
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
      active 
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/20' 
        : 'bg-white/5 text-gray-300'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {icon}
    {label}
  </motion.button>
);

interface SkillsSectionProps {
  title?: string;
  subtitle?: string;
}

const SkillsSection = ({ 
  title = "Technical Skills", 
  subtitle = "Explore my expertise across different technologies and tools" 
}: SkillsSectionProps) => {
  const [category, setCategory] = useState<string>('All');
  const [filteredSkills, setFilteredSkills] = useState<SkillProps[]>(skillsData);
  const [visualizationType, setVisualizationType] = useState<'bars' | 'radar'>('radar');
  
  // Filter skills based on selected category
  useEffect(() => {
    if (category === 'All') {
      setFilteredSkills(skillsData);
    } else {
      setFilteredSkills(skillsData.filter(skill => skill.category === category));
    }
  }, [category]);
  
  // Categories for filter
  const categories = ['All', 'Frontend', 'Backend', 'Tools'];
  
  return (
    <section className="py-16 sm:py-20 px-4 relative overflow-hidden" id="skills">
      {/* Background gradient and effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      
      {/* Blur circles */}
      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{title}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">{subtitle}</p>
        </motion.div>
        
        {/* Visualization toggle */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex bg-white/5 p-1 rounded-xl space-x-1">
            <ToggleButton
              active={visualizationType === 'radar'}
              onClick={() => setVisualizationType('radar')}
              icon={<RiRadarLine />}
              label="Radar View"
            />
            <ToggleButton
              active={visualizationType === 'bars'}
              onClick={() => setVisualizationType('bars')}
              icon={<RiBarChartHorizontalLine />}
              label="Bars View"
            />
          </div>
        </motion.div>
        
        {/* Only show category filters in bars mode */}
        {visualizationType === 'bars' && (
          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <FilterButton
                key={cat}
                active={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </FilterButton>
            ))}
          </motion.div>
        )}
        
        {/* Skills visualization */}
        <AnimatePresence mode="wait">
          {visualizationType === 'bars' ? (
            <motion.div
              key="bars"
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-3 md:gap-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredSkills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="radar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SkillRadarChart />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection; 
// "use client";

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import SkillBar, { SkillProps } from './SkillBar';
// import SkillRadarChart from './SkillRadarChart';
// import { 
//   FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaGitAlt,
//   FaNpm, FaFigma, FaDatabase, FaAws
// } from 'react-icons/fa';
// import { 
//   SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, 
//   SiExpress, SiMongodb, SiPostgresql, SiJest, SiAmazon, SiDjango, SiPostman, SiPhp
// } from 'react-icons/si';
// import { RiRadarLine, RiBarChartHorizontalLine } from 'react-icons/ri';

// // Skills data
// const skillsData: SkillProps[] = [
//   { name: 'React', percentage: 90, icon: FaReact, description: 'Advanced knowledge of React...', category: 'Frontend' },
//   { name: 'Next.js', percentage: 85, icon: SiNextdotjs, description: 'Strong experience with Next.js...', category: 'Frontend' },
//   { name: 'TypeScript', percentage: 80, icon: SiTypescript, description: 'Proficient in TypeScript...', category: 'Frontend' },
//   { name: 'JavaScript', percentage: 95, icon: SiJavascript, description: 'Expert knowledge of JavaScript...', category: 'Frontend' },
//   { name: 'Tailwind CSS', percentage: 90, icon: SiTailwindcss, description: 'Advanced knowledge of Tailwind CSS...', category: 'Frontend' },
//   { name: 'HTML5', percentage: 95, icon: FaHtml5, description: 'Expert knowledge of HTML5...', category: 'Frontend' },
//   { name: 'CSS3', percentage: 85, icon: FaCss3Alt, description: 'Strong understanding of CSS3...', category: 'Frontend' },
//   { name: 'Node.js', percentage: 80, icon: FaNodeJs, description: 'Proficient in Node.js...', category: 'Backend' },
//   { name: 'Express', percentage: 75, icon: SiExpress, description: 'Experienced with Express.js...', category: 'Backend' },
//   { name: 'MongoDB', percentage: 90, icon: SiMongodb, description: 'Strong knowledge of MongoDB...', category: 'Backend' },
//   { name: 'PostgreSQL', percentage: 90, icon: SiPostgresql, description: 'Expert in PostgreSQL...', category: 'Backend' },
//   { name: 'RESTful APIs', percentage: 95, icon: FaDatabase, description: 'Strong experience designing APIs...', category: 'Backend' },
//   { name: 'Django', percentage: 95, icon: SiDjango, description: 'Advanced Django skills including ORM, views, authentication, and admin.', category: 'Backend' },
//   { name: 'Django REST Framework', percentage: 93, icon: SiDjango, description: 'Expert in building APIs with Django REST Framework...', category: 'Backend' },
//   { name: 'Git', percentage: 85, icon: FaGitAlt, description: 'Proficient with Git...', category: 'Tools' },
//   { name: 'Docker', percentage: 70, icon: FaDocker, description: 'Good understanding of Docker...', category: 'Tools' },
//   { name: 'AWS', percentage: 65, icon: SiAmazon, description: 'Working knowledge of AWS...', category: 'Tools' },
//   { name: 'Jest', percentage: 75, icon: SiJest, description: 'Experienced with Jest...', category: 'Tools' },
//   { name: 'npm', percentage: 90, icon: FaNpm, description: 'Advanced knowledge of npm...', category: 'Tools' },
//   { name: 'Figma', percentage: 80, icon: FaFigma, description: 'Proficient with Figma...', category: 'Tools' },
//   { name: 'Postman', percentage: 95, icon: SiPostman, description: 'Expert in API testing and automation using Postman.', category: 'Tools' },
//   { name: 'phpMyAdmin', percentage: 90, icon: SiPhp, description: 'Skilled in using phpMyAdmin for managing MySQL databases.', category: 'Tools' }
// ];

// // Remaining code stays unchanged...

// // [Unchanged FilterButton, ToggleButton, SkillsSection component, etc. remain below this line]
