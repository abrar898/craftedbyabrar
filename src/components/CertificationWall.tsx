// components/CertificationWall.tsx
'use client';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

const certifications = [
  { 
    id: 'aws',
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2023',
    url: '#',
    badge: '/certifications/aws.svg'
  },
  // Add more certifications
];

export default function CertificationWall() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, index) => (
        <motion.a
          key={cert.id}
          href={cert.url}
          target="_blank"
          rel="noopener"
          className="group bg-gray-900/50 p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start gap-4">
            <img 
              src={cert.badge} 
              alt={cert.name}
              className="w-16 h-16 object-contain"
            />
            <div>
              <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                {cert.name}
                <FiExternalLink className="inline-block ml-2 w-4 h-4" />
              </h3>
              <p className="text-gray-400 text-sm">{cert.issuer}</p>
              <p className="text-gray-500 text-xs mt-2">{cert.date}</p>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}