'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  className?: string;
  showValue?: boolean;
  delay?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'bg-blue-500',
  className = '',
  showValue = true,
  delay = 0
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const getColorClass = (val: number) => {
    if (val >= 80) return 'bg-green-500';
    if (val >= 60) return 'bg-yellow-500';
    if (val >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showValue && (
            <span className="text-sm font-bold text-white">{value}{max === 100 ? '%' : `/${max}`}</span>
          )}
        </div>
      )}
      
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color || getColorClass(percentage)} relative`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut",
            delay: delay 
          }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-white opacity-30 rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-y-0 w-6 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
            animate={{
              x: [-100, 300],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: delay + 1,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
