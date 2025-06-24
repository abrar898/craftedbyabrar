// components/AIChatInterface.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser, FiX } from 'react-icons/fi';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface Message {
  content: string;
  isBot: boolean;
}

interface SkillData {
  category: string;
  level: number;
  examples: string[];
}

export default function AIDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showGraph, setShowGraph] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const skills: SkillData[] = [
    { category: 'Frontend', level: 90, examples: ['React', 'Next.js', 'TypeScript'] },
    { category: 'Backend', level: 80, examples: ['Node.js', 'PostgreSQL', 'REST APIs'] },
    { category: 'DevOps', level: 75, examples: ['Docker', 'AWS', 'CI/CD'] },
    { category: 'Design', level: 85, examples: ['Figma', 'UI/UX', 'Prototyping'] }
  ];

  const chartData = {
    labels: skills.map(s => s.category),
    datasets: [{
      data: skills.map(s => s.level),
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: '#6366f1',
      borderWidth: 2
    }]
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { display: false },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#fff' }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const skill = skills[context.dataIndex];
            return [
              `Proficiency: ${context.raw}%`,
              `Technologies: ${skill.examples.join(', ')}`
            ];
          }
        }
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { content: input, isBot: false }]);
    
    // Generate AI response
    const botResponse = await generateAIResponse(input);
    
    // Add bot message
    setMessages(prev => [...prev, { 
      content: botResponse, 
      isBot: true 
    }]);
    
    setInput('');
  };

  const generateAIResponse = async (query: string) => {
    // In a real implementation, you'd call an API endpoint
    // Here's a simulated response based on common questions
    const q = query.toLowerCase();
    
    if (q.includes('experience')) {
      return "I have 3+ years of professional experience building full-stack applications, with a focus on modern web technologies. My expertise spans from UI development to cloud infrastructure management.";
    }
    
    if (q.includes('tech') || q.includes('stack')) {
      return "My core stack includes Next.js, TypeScript, Node.js, and PostgreSQL. Check the skill graph for detailed proficiency levels in each area!";
    }

    if (q.includes('project') || q.includes('work')) {
      return "You can explore my featured projects section. Each case study includes tech details, challenges overcome, and measurable outcomes.";
    }

    return "I'm an AI assistant here to help you learn more about my skills and experience. Feel free to ask about my technical expertise, projects, or professional background!";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowGraph(!showGraph)}
          className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors"
        >
          {showGraph ? 'Show Chat' : 'Show Skills'}
        </button>
      </div>

      {showGraph ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-96"
        >
          <Radar data={chartData} options={chartOptions} />
          <p className="text-center text-gray-400 mt-4">
            Hover over points to see technology examples
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col h-96 bg-gray-800/30 rounded-xl"
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.isBot ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[70%] p-4 rounded-2xl ${
                    message.isBot 
                      ? 'bg-gray-700/50 rounded-bl-none'
                      : 'bg-primary/20 rounded-br-none'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {message.isBot ? (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-xs">AI</span>
                        </div>
                      ) : (
                        <FiUser className="text-primary" />
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my skills or experience..."
                className="flex-1 bg-gray-900/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-primary hover:bg-primary/80 transition-colors"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}