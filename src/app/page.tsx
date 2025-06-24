"use client";

import dynamic from 'next/dynamic';
import BlogSection from '@/components/BlogSection'
// Dynamic import for components that use browser APIs
const HeroSection = dynamic(() => import('../components/HeroSection'), {
  ssr: false,
});

const ProjectShowcase = dynamic(() => import('../components/projects/ProjectShowcase'), {
  ssr: true,
});

const SkillsSection = dynamic(() => import('../components/skills/SkillsSection'), {
  ssr: true,
});

const ContactForm = dynamic(() => import('../components/contact/ContactForm'), {
  ssr: true,
});

const SectionDivider = dynamic(() => import('../components/SectionDivider'), {
  ssr: true,
});

const ParticleController = dynamic(() => import('../components/particles/ParticleController'), {
  ssr: false,
});

const HireMe = dynamic(() => import('../components/HireMe'), {
  ssr: true,
});
const Aboutme=dynamic(()=>import ('../components/AIDashboard'),{
  ssr:true,
});
const Chatbot = dynamic(() => import('../components/Chatbot'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      {/* Particle background effect */}
      <ParticleController 
        particleCount={100}
        particleSize={2}
        connectDistance={150}
        repulseDistance={120}
        repulseStrength={8}
      />
      
      <section id="home">
        <HeroSection />
      </section>
      <SectionDivider />
      
      <section id="projects">
        <ProjectShowcase 
          title="GitHub Projects" 
          subtitle="Check out my code repositories from GitHub"
        />
      </section>
      <SectionDivider />
      
      <section id="skills">
        <SkillsSection />
      </section>
      <SectionDivider />
      
      <section id="contact">
        <ContactForm />
      </section>
      {/* <SectionDivider /> */}
      
      {/* <section id="blog"> */}
        {/* <BlogSection/> */}
      {/* </section> */}
      <SectionDivider />
      
      <HireMe />
      
      {/* AI Chatbot */}
      <Chatbot />
      </main>
  );
}
