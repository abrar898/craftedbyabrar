"use client";

import { Project, Tag, LanguageStat } from "../components/projects/ProjectCard";
// import fetch from 'node-fetch';

// GitHub username
const GITHUB_USERNAME = 'abrar898';

// Map GitHub topics to color codes
const topicColorMap: Record<string, string> = {
  react: "blue",
  typescript: "purple",
  javascript: "yellow",
  nextjs: "blue",
  tailwindcss: "teal",
  css: "blue",
  html: "red",
  nodejs: "green",
  express: "green",
  mongodb: "green",
  django: "green",
  api: "indigo",
  frontend: "pink",
  backend: "green",
  fullstack: "purple",
  web: "blue",
  responsive: "teal",
  ui: "pink",
  ux: "indigo",
  github: "gray",
  default: "gray"
};

// Get color for a topic
function getTopicColor(topic: string): string {
  for (const [key, value] of Object.entries(topicColorMap)) {
    if (topic.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return topicColorMap.default;
}

// Placeholder image URLs from Unsplash (technology-related)
const placeholderImages = [
  // 1. DNS Project
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000",
  
  // 2. E-Commerce
  "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=1000",
  
  // 3. Music Website
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000",
  
  // 4. Mood Planner
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
  
  // 5. Bus Booking
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000",
  // (Extra image as fallback)
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
"https://99designs.com/inspiration/designs/splash-screen"
];



// Generate mock language statistics based on project tags and language
function generateLanguageStats(repo: any, tags: Tag[]): LanguageStat[] {
  const stats: LanguageStat[] = [];
  
  // Primary language (highest percentage)
  if (repo.language) {
    stats.push({
      name: repo.language,
      percentage: Math.floor(Math.random() * 30) + 40, // 40-70%
      color: getTopicColor(repo.language)
    });
  }
  
  // Add other languages from tags or common pairings
  const usedTags = new Set([repo.language?.toLowerCase()]);
  
  // Add secondary languages from topics
  if (repo.topics && repo.topics.length > 0) {
    for (const topic of repo.topics) {
      // Skip if it's not a language or already added
      if (usedTags.has(topic.toLowerCase())) continue;
      
      // Check if topic looks like a language
      const langTopics = ['javascript', 'typescript', 'python', 'java', 'html', 'css', 'php', 'ruby', 'go', 'rust', 'c', 'cpp', 'csharp'];
      if (langTopics.some(lang => topic.toLowerCase().includes(lang))) {
        usedTags.add(topic.toLowerCase());
        stats.push({
          name: topic,
          percentage: Math.floor(Math.random() * 20) + 10, // 10-30%
          color: getTopicColor(topic)
        });
      }
    }
  }
  
  // Add common pairings if needed
  if (repo.language && stats.length < 3) {
    const commonPairings: Record<string, string[]> = {
      'JavaScript': ['HTML', 'CSS'],
      'TypeScript': ['HTML', 'CSS'],
      'React': ['JavaScript', 'CSS'],
      'HTML': ['CSS', 'JavaScript'],
      'Python': ['HTML', 'JavaScript'],
      'Java': ['HTML', 'CSS']
    };
    
    const pairs = commonPairings[repo.language] || [];
    for (const pair of pairs) {
      if (usedTags.has(pair.toLowerCase()) || stats.length >= 3) continue;
      usedTags.add(pair.toLowerCase());
      stats.push({
        name: pair,
        percentage: Math.floor(Math.random() * 15) + 5, // 5-20%
        color: getTopicColor(pair)
      });
    }
  }
  
  // Ensure the total is 100%
  const currentTotal = stats.reduce((sum, stat) => sum + stat.percentage, 0);
  if (currentTotal !== 100 && stats.length > 0) {
    stats[0].percentage += (100 - currentTotal);
  }
  
  // If we have no languages, add a placeholder
  if (stats.length === 0) {
    stats.push({
      name: "Code",
      percentage: 100,
      color: "blue"
    });
  }
  
  return stats;
}

// Function to get the demo URL based on project name
function getDemoUrl(repoName: string): string {
  const demoUrls: Record<string, string> = {
    'codizer':'https://github.com/abrar898/codizer',
    'youtube-clone':'https://github.com/abrar898/youtube-clone',
    'LibraryManagementSystem':'https://github.com/abrar898/LibraryManagementSystem',
    'Ecommerce-Django': 'https://abrar898.github.io/Ecommerce-Django/',
    'tailwindcssproject': 'https://abrar898.github.io/tailwindcssproject/',
    'DNS-System':'https://github.com/abrar898/DNS-SYSTEM',
    'SMS':'https://github.com/abrar898/school-management-system',
    'Mood-planner':'https://github.com/abrar898/mood-planner'
  };
  
  return demoUrls[repoName] || 'https://abrar898.github.io/UI-dashboard/'; // Default to UI dashboard if not found
}

// Fetch GitHub repositories
export async function fetchGitHubProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }
    
    const repositories = await response.json();
    return repositories.map((repo: any, index: number) => {
      // Create tags from topics or language
      const tags: Tag[] = [];
      
      // Add language as a tag if it exists
      if (repo.language) {
        tags.push({
          name: repo.language,
          color: getTopicColor(repo.language)
        });
      }
      
      // Add additional tags if topics exist
      if (repo.topics && repo.topics.length > 0) {
        repo.topics.slice(0, 3).forEach((topic: string) => {
          tags.push({
            name: topic,
            color: getTopicColor(topic)
          });
        });
      }
      
      // Ensure we have at least one tag
      if (tags.length === 0) {
        tags.push({
          name: "GitHub",
          color: "gray"
        });
      }
      
      // Generate language statistics
      const languageStats = generateLanguageStats(repo, tags);
      
      // Get project-specific demo URL
      const demoUrl = getDemoUrl(repo.name);
      
      // Generate project
      return {
        id: repo.id.toString(),
        title: repo.name,
        description: repo.description || `A ${repo.language || 'code'} project by M Abrar Ahmad.`,
        imageUrl: placeholderImages[index % placeholderImages.length],
        tags: tags,
        githubUrl: repo.html_url,
        demoUrl: demoUrl,
        detailedDescription: repo.description || `This is a GitHub repository created by M Abrar Ahmad. Check out the code on GitHub to learn more about this project.`,
        languageStats: languageStats
      };
    });
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

// Fallback to static projects if API fetch fails
// 
export function getStaticProjects(): Project[] {
  return [
    {
      id: "tailwindcssproject",
      title: "Tailwind CSS Project",
      description: "A project showcasing responsive design with Tailwind CSS",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
      tags: [
        { name: "Tailwind CSS", color: "teal" },
        { name: "HTML", color: "blue" },
        { name: "Javascript", color: "purple" }
      ],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/tailwindcssproject`,
      demoUrl: getDemoUrl("tailwindcssproject"),
      detailedDescription: "A responsive web design project built with Tailwind CSS, showcasing modern UI design patterns and best practices.",
      languageStats: [
        { name: "HTML", percentage: 25, color: "red" },
        { name: "Tailwindcss", percentage: 60, color: "blue" },
        { name: "JavaScript", percentage: 15, color: "yellow" }
      ]
    },
    {
      id: "Ecommerce-Django",
      title: "E-Commerce Website",
      description: "Online shopping platform with product catalog and checkout functionality",
      imageUrl: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=1000",
      tags: [
        { name: "Django", color: "green" },
        { name: "HTML", color: "red" },
        { name: "TailwindCSS", color: "teal" },
        { name: "E-commerce", color: "green" }
      ],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/Ecommerce-Django`,
      demoUrl: getDemoUrl("Ecommerce"),
      detailedDescription: "An e-commerce site with cart, checkout, and account management, built with Django and TailwindCSS.",
      languageStats: [
        { name: "Python", percentage: 50, color: getTopicColor("django") },
        { name: "HTML", percentage: 20, color: getTopicColor("html") },
        { name: "CSS", percentage: 15, color: getTopicColor("css") },
        { name: "TailwindCSS", percentage: 15, color: getTopicColor("tailwindcss") }
      ]
    },
    {
      id: "Mood-planner",
      title: "Mood Planner App",
      description: "Track your moods and tasks in one place with clean UI and AI support",
      imageUrl:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
      tags: [
        { name: "React", color: "blue" },
        { name: "TailwindCSS", color: "teal" },
        { name: "REST API", color: "red" },
        { name: "Mental Health", color: "pink" }
      ],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/mood-planner`,
      demoUrl: getDemoUrl("Mood-planner"),
      detailedDescription: "A mood tracking and task management app featuring responsive design, charts, and AI suggestions.",
      languageStats: [
        { name: "React", percentage: 60, color: "blue" },
        { name: "Django", percentage: 70, color: "blue" },
        { name: "JavaScript", percentage: 30, color: "yellow" },
        { name: "CSS", percentage: 10, color: "gray" }
      ]
    },
    {
      id: "Youtube-clone",
      title: "YouTube Clone",
      description: "A functional YouTube UI clone built with modern front-end tools",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000",
      tags: [
        { name: "React", color: "blue" },
        { name: "Material UI", color: "gray" },
        { name: "Javascript", color: "teal" },
        { name: "API", color: "yellow" }
      ],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/youtube-clone`,
      demoUrl: getDemoUrl("Youtube-clone"),
      detailedDescription: "A YouTube front-end replica with real video search and playback via YouTube API.",
      languageStats: [
        { name: "React", percentage: 70, color: "blue" },
        { name: "JavaScript", percentage: 30, color: "yellow" }
      ]
    },
    {
      id: "Codizer",
      title: "Codizer - Code Snippet Manager",
      description: "Manage and store your code snippets efficiently with tagging and syntax support",
      imageUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1000",
      tags: [
        { name: "React", color: "blue" },
        { name: "VScode Extension", color: "indigo" },
        { name: "Utilities", color: "green" }
      ],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/codizer`,
      demoUrl: getDemoUrl("Codizer"),
      detailedDescription: "Codizer allows developers to manage code snippets with syntax highlighting and category tags.",
      languageStats: [
        { name: "JavaScript", percentage: 50, color: "yellow" },
        { name: "Typescript", percentage: 30, color: "blue" },
        { name: "CSS", percentage: 20, color: "gray" }
      ]
    },
    {
      id: "Library",
      title: "Library Management System",
      description: "A Java-powered system for managing books, users, and loans",
      imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000",
      tags: [
        { name: "Java", color: "green" },
        { name: "Swing", color: "green" },
        { name: "AWT", color: "purple" }
      ],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/LibraryManagementSystem`,
      demoUrl: getDemoUrl("Library"),
      detailedDescription: "A full-stack library system allowing book tracking, issue records, and user control with Django.",
      languageStats: [
        { name: "Java", percentage: 50, color: getTopicColor("java") },
        { name: "Swing", percentage: 70, color: getTopicColor("java-swing") },
      ]
    },
    {
      id: "DNS-System",
      title: "DNS Resolver System",
      description: "Low-level system handling domain name resolution logic",
      imageUrl: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1000",
      tags: [
        { name: "Networking", color: "orange" },
        { name: "Django", color: "gray" },
        { name: "Python", color: "purple" }
      ],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/DNS-SYSTEM`,
      demoUrl: getDemoUrl("DNS-System"),
      detailedDescription: "A system-level project simulating DNS query resolution for educational and experimental use.",
      languageStats: [
        { name: "Python", percentage: 90, color: "gray" },
        { name: "Tailwindcss", percentage: 10, color: "green" }
      ]
    },
    {
      id: "SMS",
      title: "School Management System",
      description: "Admin portal to manage school activities and student data",
      imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000",
      tags: [
        { name: "Django", color: "yellow" },
        { name: "MySQL", color: "blue" },
        { name: "Python", color: "indigo" }
      ],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/school-management-system`,
      demoUrl: getDemoUrl("SMS"),
      detailedDescription: "Web-based application to handle school operations like admissions, grades, and attendance.",
      languageStats: [
        { name: "Python", percentage: 60, color: "yellow" },
        { name: "HTML", percentage: 25, color: "red" },
        { name: "CSS", percentage: 15, color: "blue" }
      ]
    }
  ];
}
