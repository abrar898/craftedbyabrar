// components/BlogSection.tsx
'use client';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const posts = [
  {
    id: 1,
    title: 'Optimizing Next.js Performance',
    category: 'Performance',
    date: 'Mar 15, 2024',
    excerpt: 'Deep dive into advanced optimization techniques...',
    url: '#'
  },
  // Add more posts
];

export default function BlogSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post, index) => (
        <motion.a
          key={post.id}
          href={post.url}
          className="group bg-gray-900/50 p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-primary px-3 py-1 rounded-full bg-primary/20">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.date}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
            <FiArrowUpRight className="inline-block ml-2" />
          </h3>
          <p className="text-gray-400">{post.excerpt}</p>
        </motion.a>
      ))}
    </div>
  );
}