"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaCode, FaStar, FaCodeBranch } from 'react-icons/fa';

interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

const GitHubProfile = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchGitHubUser() {
      try {
        const response = await fetch('https://api.github.com/users/abrar898');
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub profile');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching GitHub profile:', err);
        setError('Could not load GitHub profile');
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 p-6 text-center">
        <FaGithub className="w-10 h-10 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-300">GitHub profile information unavailable</p>
        <a 
          href="https://github.com/abrar898" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm hoverable"
        >
          Visit GitHub
        </a>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hoverable"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">{user.name || user.login}</h3>
          <a 
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer" 
            className="text-blue-400 text-sm flex items-center gap-1 hover:underline"
          >
            <FaGithub /> @{user.login}
          </a>
        </div>
      </div>
      
      <div className="p-4">
        {user.bio && (
          <p className="text-gray-300 mb-4">{user.bio}</p>
        )}
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-black/20 p-2 rounded flex flex-col items-center">
            <div className="flex items-center gap-1 text-blue-400">
              <FaCode className="w-4 h-4" />
              <span className="font-semibold">{user.public_repos}</span>
            </div>
            <span className="text-xs text-gray-400">Repositories</span>
          </div>
          
          <div className="bg-black/20 p-2 rounded flex flex-col items-center">
            <div className="flex items-center gap-1 text-purple-400">
              <FaStar className="w-4 h-4" />
              <span className="font-semibold">{user.followers}</span>
            </div>
            <span className="text-xs text-gray-400">Followers</span>
          </div>
          
          <div className="bg-black/20 p-2 rounded flex flex-col items-center">
            <div className="flex items-center gap-1 text-green-400">
              <FaCodeBranch className="w-4 h-4" />
              <span className="font-semibold">{user.following}</span>
            </div>
            <span className="text-xs text-gray-400">Following</span>
          </div>
        </div>
        
        <a 
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer" 
          className="block w-full py-2 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          View GitHub Profile
        </a>
      </div>
    </motion.div>
  );
};

export default GitHubProfile; 