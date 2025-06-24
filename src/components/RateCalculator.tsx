// components/RateCalculator.tsx
'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiInfo, FiRefreshCw } from 'react-icons/fi';

interface Feature {
  name: string;
  label: string;
  days: number;
}

const BASE_RATE = 50; // $50/hour
const WORK_HOURS_PER_DAY = 8;

export default function RateCalculator() {
  const [projectType, setProjectType] = useState('web');
  const [complexity, setComplexity] = useState('medium');
  const [duration, setDuration] = useState(3);
  const [features, setFeatures] = useState<Set<string>>(new Set());
  const [currency, setCurrency] = useState('USD');

  const projectTypes = {
    web: { label: 'Web Application', multiplier: 1.2 },
    mobile: { label: 'Mobile App', multiplier: 1.3 },
    ecommerce: { label: 'E-commerce', multiplier: 1.5 },
    landing: { label: 'Landing Page', multiplier: 0.8 },
    saas: { label: 'SaaS Platform', multiplier: 1.6 }
  };

  const complexityLevels = {
    simple: { label: 'Simple', multiplier: 0.8 },
    medium: { label: 'Medium', multiplier: 1 },
    complex: { label: 'Complex', multiplier: 1.5 }
  };

  const featureOptions: Feature[] = [
    { name: 'auth', label: 'User Authentication', days: 3 },
    { name: 'payment', label: 'Payment Integration', days: 5 },
    { name: 'cms', label: 'Custom CMS', days: 7 },
    { name: 'api', label: 'Third-party API', days: 4 },
    { name: 'chat', label: 'Live Chat', days: 2 }
  ];

  const total = useMemo(() => {
    // Base calculation
    const baseDays = duration * 22; // 22 working days/month
    let totalDays = baseDays * complexityLevels[complexity as keyof typeof complexityLevels].multiplier;
    
    // Add features
    featureOptions.forEach(feature => {
      if (features.has(feature.name)) {
        totalDays += feature.days;
      }
    });

    // Apply project type multiplier
    totalDays *= projectTypes[projectType as keyof typeof projectTypes].multiplier;

    // Calculate cost
    const totalHours = totalDays * WORK_HOURS_PER_DAY;
    let totalCost = totalHours * BASE_RATE;

    // Currency conversion (simplified)
    if (currency === 'EUR') totalCost *= 0.92;
    if (currency === 'GBP') totalCost *= 0.79;

    return totalCost;
  }, [projectType, complexity, duration, features, currency]);

  const toggleFeature = (feature: string) => {
    const newFeatures = new Set(features);
    newFeatures.has(feature) ? newFeatures.delete(feature) : newFeatures.add(feature);
    setFeatures(newFeatures);
  };

  const resetCalculator = () => {
    setProjectType('web');
    setComplexity('medium');
    setDuration(3);
    setFeatures(new Set());
    setCurrency('USD');
  };

  return (
    <motion.div 
      className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">Project Cost Estimator</h2>
        <button 
          onClick={resetCalculator}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <FiRefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Project Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Project Type</label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full bg-gray-800/50 rounded-lg p-3 border border-white/10 focus:ring-2 focus:ring-primary"
          >
            {Object.entries(projectTypes).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>
        </div>

        {/* Complexity */}
        <div>
          <label className="block text-sm font-medium mb-2">Complexity Level</label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(complexityLevels).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setComplexity(key)}
                className={`p-3 rounded-lg text-sm ${
                  complexity === key 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-800/50 hover:bg-gray-700/50'
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Estimated Duration: {duration} month{duration > 1 ? 's' : ''}
          </label>
          <input
            type="range"
            min="1"
            max="12"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium mb-2">Additional Features</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {featureOptions.map((feature) => (
              <button
                key={feature.name}
                onClick={() => toggleFeature(feature.name)}
                className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                  features.has(feature.name)
                    ? 'bg-primary/20 border border-primary/30'
                    : 'bg-gray-800/50 hover:bg-gray-700/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={features.has(feature.name)}
                  className="accent-primary"
                  readOnly
                />
                {feature.label}
                <FiInfo className="ml-auto opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Currency */}
        <div className="flex gap-4 items-center">
          <label className="text-sm font-medium">Currency:</label>
          {['USD', 'EUR', 'GBP'].map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-3 py-1 rounded-full text-sm ${
                currency === curr
                  ? 'bg-primary text-white'
                  : 'bg-gray-800/50 hover:bg-gray-700/50'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>

        {/* Result */}
        <motion.div 
          className="p-6 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Estimated Cost</p>
              <p className="text-3xl font-bold">
                {currency}{' '}
                {total.toLocaleString(undefined, {
                  style: 'currency',
                  currency,
                  maximumFractionDigits: 0
                }).replace(currency, '')}
              </p>
            </div>
            <button className="w-full md:w-auto px-6 py-3 rounded-full bg-primary hover:bg-primary/80 transition-colors">
              Start Project
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4 flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4" />
            This estimate includes discovery, development, and deployment phases
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}