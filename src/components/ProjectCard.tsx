// components/ProjectCard.tsx
'use client';
import ProjectMetric from './ProjectMetric';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  metrics?: {
    performance?: number;
    users?: number;
    accessibility?: number;
    loadTime?: number;
  };
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border rounded-2xl p-6 bg-gradient-to-b from-gray-900/50 to-transparent">
      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
      <p className="text-gray-400 mb-6">{project.description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-6">
        {project.metrics?.performance && (
          <ProjectMetric value={project.metrics.performance} label="Performance Gain" suffix="%" />
        )}
        {project.metrics?.users && (
          <ProjectMetric value={project.metrics.users} label="Active Users" suffix="+" />
        )}
        {project.metrics?.accessibility && (
          <ProjectMetric value={project.metrics.accessibility} label="Accessibility" suffix="%" />
        )}
        {project.metrics?.loadTime && (
          <ProjectMetric value={project.metrics.loadTime} label="Load Time" suffix="s" />
        )}
      </div>
    </div>
  );
}