import { ProjectCardData } from '@/components/showcase/FlipCard';

export const projectsData: ProjectCardData[] = [
  {
    id: 1,
    title: 'Tailwind CSS Project',
    description: 'A project showcasing responsive design with Tailwind CSS and modern UI patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000',
    demoUrl: 'https://abrar898.github.io/tailwindcssproject/',
    githubUrl: 'https://github.com/abrar898/tailwindcssproject',
    techStack: [
      { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
      { name: 'HTML', color: 'bg-red-500 text-white' },
      { name: 'Responsive', color: 'bg-purple-600 text-white' }
    ],
    impactMetrics: [
      { value: 95, label: 'Responsive UI', suffix: '%' },
      { value: 3, label: 'Page Layouts' }
    ]
  },
  {
    id: 2,
    title: 'E-Commerce Website',
    description: 'Django-powered online shop with full cart and checkout functionality.',
    imageUrl: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=1000',
    demoUrl: 'https://abrar898.github.io/ecom/',
    githubUrl: 'https://github.com/abrar898/eEcommerce-Django',
    techStack: [
      { name: 'Django', color: 'bg-green-600 text-white' },
      { name: 'HTML', color: 'bg-red-500 text-white' },
      { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' }
    ],
    impactMetrics: [
      { value: 100, label: 'Product Pages' },
      { value: 5, label: 'Payment Options' }
    ]
  },
  {
    id: 3,
    title: 'Mood Planner App',
    description: 'Track moods and plan tasks using AI-enhanced UI and Django backend.',
    imageUrl: 'https://99designs.com/inspiration/designs/splash-screen',
    demoUrl: 'https://abrar898.github.io/mood-planner/',
    githubUrl: 'https://github.com/abrar898/mood-planner',
    techStack: [
      { name: 'React', color: 'bg-blue-600 text-white' },
      { name: 'Tailwind CSS', color: 'bg-teal-500 text-white' },
      { name: 'Django', color: 'bg-green-700 text-white' }
    ],
    impactMetrics: [
      { value: 10, label: 'Mood Charts' },
      { value: 7, label: 'Task Views' }
    ]
  },
  {
    id: 4,
    title: 'YouTube Clone',
    description: 'A modern YouTube UI clone with live video fetch and playback.',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000',
    demoUrl: 'https://abrar898.github.io/youtube-clone/',
    githubUrl: 'https://github.com/abrar898/youtube-clone',
    techStack: [
      { name: 'React', color: 'bg-blue-600 text-white' },
      { name: 'Material UI', color: 'bg-gray-600 text-white' },
      { name: 'YouTube API', color: 'bg-red-600 text-white' }
    ],
    impactMetrics: [
      { value: 50, label: 'Video Queries/Min' },
      { value: 2, label: 'Playback Modes' }
    ]
  },
  {
    id: 5,
    title: 'Codizer - Code Snippet Manager',
    description: 'Save, tag, and manage your code snippets with syntax highlighting.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000',
    demoUrl: 'https://abrar898.github.io/codizer/',
    githubUrl: 'https://github.com/abrar898/codizer',
    techStack: [
      { name: 'React', color: 'bg-blue-500 text-white' },
      { name: 'TypeScript', color: 'bg-blue-600 text-white' },
      { name: 'CSS', color: 'bg-gray-500 text-white' }
    ],
    impactMetrics: [
      { value: 120, label: 'Snippets Stored' },
      { value: 4, label: 'Languages Supported' }
    ]
  },
  {
    id: 6,
    title: 'Library Management System',
    description: 'Manage books, users, and loans using Java Swing GUI.',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000',
    demoUrl: 'https://abrar898.github.io/library/',
    githubUrl: 'https://github.com/abrar898/LibraryManagementSystem',
    techStack: [
      { name: 'Java', color: 'bg-green-600 text-white' },
      { name: 'Swing', color: 'bg-lime-700 text-white' }
    ],
    impactMetrics: [
      { value: 200, label: 'Books Managed' },
      { value: 20, label: 'Admins' }
    ]
  },
  {
    id: 7,
    title: 'DNS Resolver System',
    description: 'Simulate and visualize DNS resolution in a full-stack project.',
    imageUrl: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1000',
    demoUrl: 'https://abrar898.github.io/dns-resolver/',
    githubUrl: 'https://github.com/abrar898/DNS-SYSTEM',
    techStack: [
      { name: 'Django', color: 'bg-green-600 text-white' },
      { name: 'Networking', color: 'bg-orange-500 text-white' },
      { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' }
    ],
    impactMetrics: [
      { value: 15, label: 'Simulated Queries' },
      { value: 5, label: 'Record Types' }
    ]
  },
  {
    id: 8,
    title: 'School Management System',
    description: 'Manage student data, attendance, and results with MySQL + Django.',
    imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000',
    demoUrl: 'https://abrar898.github.io/school/',
    githubUrl: 'https://github.com/abrar898/school-management-system',
    techStack: [
      { name: 'Django', color: 'bg-green-700 text-white' },
      { name: 'MySQL', color: 'bg-blue-500 text-white' },
      { name: 'Admin Panel', color: 'bg-indigo-600 text-white' }
    ],
    impactMetrics: [
      { value: 800, label: 'Students Managed' },
      { value: 25, label: 'Teachers' }
    ]
  }
];


// import { ProjectCardData } from '@/components/showcase/FlipCard';

// const GITHUB_USERNAME = 'abrar898';

// const placeholderImages = [
//   '/images/projects/portfolio.jpg',
//   '/images/projects/ecommerce.jpg',
//   '/images/projects/weather.jpg',
//   '/images/projects/taskapp.jpg',
//   '/images/projects/chat.jpg',
// ];

// const topicColorMap: Record<string, string> = {
//   react: 'bg-blue-500 text-white',
//   typescript: 'bg-blue-600 text-white',
//   javascript: 'bg-yellow-400 text-black',
//   nextjs: 'bg-black text-white',
//   tailwindcss: 'bg-sky-500 text-white',
//   css: 'bg-blue-400 text-white',
//   html: 'bg-red-500 text-white',
//   nodejs: 'bg-green-600 text-white',
//   express: 'bg-gray-600 text-white',
//   mongodb: 'bg-green-500 text-white',
//   api: 'bg-gray-700 text-white',
//   firebase: 'bg-amber-500 text-white',
//   default: 'bg-gray-400 text-white',
// };

// function getColor(topic: string): string {
//   const key = topic.toLowerCase();
//   return topicColorMap[key] || topicColorMap.default;
// }

// export async function fetchGitHubProjectCards(): Promise<ProjectCardData[]> {
//   try {
//     const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
//     const repos = await res.json();

//     return repos.map((repo: any, index: number): ProjectCardData => {
//       const tags = [];

//       if (repo.language) {
//         tags.push({ name: repo.language, color: getColor(repo.language) });
//       }

//       if (repo.topics) {
//         repo.topics.slice(0, 2).forEach((topic: string) =>
//           tags.push({ name: topic, color: getColor(topic) })
//         );
//       }

//       return {
//         id: repo.id,
//         title: repo.name,
//         description: repo.description || 'A GitHub project by Abrar Ahmad.',
//         imageUrl: placeholderImages[index % placeholderImages.length],
//         githubUrl: repo.html_url,
//         demoUrl: repo.homepage || '',
//         techStack: tags,
//         impactMetrics: [
//           { value: 100, label: 'Open Source', suffix: '%' },
//           { value: 5, label: 'Stars', suffix: '+' }
//         ]
//       };
//     });
//   } catch (error) {
//     console.error('Error fetching GitHub projects:', error);
//     return [];
//   }
// }
