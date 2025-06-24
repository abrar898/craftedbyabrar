"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard, { Project } from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { getStaticProjects } from "../../utils/githubFetcher";
import dynamic from 'next/dynamic';

// Import 3D components dynamically with ssr: false to prevent hydration issues
const Background3D = dynamic(() => import('./Background3D'), { ssr: false });
const Grid3D = dynamic(() => import('./Grid3D'), { ssr: false });

interface ProjectShowcaseProps {
  title?: string;
  subtitle?: string;
}

const ProjectShowcase = ({ 
  title = "My Projects", 
  subtitle = "Check out some of my recent work" 
}: ProjectShowcaseProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackground, setShowBackground] = useState(false);

  // Effect to enable background after client-side hydration is complete
  useEffect(() => {
    setShowBackground(true);
  }, []);
useEffect(() => {
  async function loadProjects() {
    setLoading(true);
    try {
      const githubProjects = await getStaticProjects();
      
      if (githubProjects && githubProjects.length > 0) {
        setProjects(githubProjects);
      } else {
        setProjects(getStaticProjects());
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      setProjects(getStaticProjects());
    } finally {
      setLoading(false);
    }
  }

  loadProjects();
}, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Animation variants for staggered container
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

return (
  <section className="py-16 sm:py-20 px-4 relative overflow-hidden" id="projects">
    {showBackground && (
      <>
        <Background3D />
        <Grid3D />
      </>
    )}

    {/* Background gradient */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => openModal(project)}
            />
          ))}
        </motion.div>
      )}
    </div>

    <ProjectModal
      project={selectedProject}
      isOpen={modalOpen}
      onClose={closeModal}
    />
  </section>
);
}

export default ProjectShowcase; 