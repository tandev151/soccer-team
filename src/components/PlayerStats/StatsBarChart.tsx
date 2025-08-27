'use client';

import { PlayerStats } from '@/constants/squash';
import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatsBarChartProps {
  stats: PlayerStats;
}

export const StatsBarChart: React.FC<StatsBarChartProps> = ({ stats }) => {
  const chartRef = useRef(null);

  // Key stats to display
  const keyStats = [
    { label: 'Goals', value: stats.goals, color: 'rgba(34, 197, 94, 0.8)' }, // green
    { label: 'Assists', value: stats.assists, color: 'rgba(59, 130, 246, 0.8)' }, // blue
    { label: 'Pass Acc %', value: stats.passAccuracy, color: 'rgba(168, 85, 247, 0.8)' }, // purple
    { label: 'Shot Acc %', value: stats.shotAccuracy, color: 'rgba(249, 115, 22, 0.8)' }, // orange
    { label: 'Dribble %', value: stats.dribbleSuccess, color: 'rgba(236, 72, 153, 0.8)' }, // pink
    { label: 'Tackles', value: stats.tackles, color: 'rgba(239, 68, 68, 0.8)' }, // red
  ];

  const data = {
    labels: keyStats.map(stat => stat.label),
    datasets: [
      {
        label: 'Player Statistics',
        data: keyStats.map(stat => stat.value),
        backgroundColor: keyStats.map(stat => stat.color),
        borderColor: keyStats.map(stat => stat.color.replace('0.8', '1')),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const label = context.label;
            const value = context.parsed.y;
            if (label.includes('%')) {
              return `${label}: ${value}%`;
            }
            return `${label}: ${value}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(156, 163, 175, 1)', // gray-400
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
          lineWidth: 1,
        },
        ticks: {
          color: 'rgba(156, 163, 175, 1)',
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
      delay: (context: any) => {
        return context.dataIndex * 100;
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="relative h-80"
    >
      <Bar ref={chartRef} data={data} options={options} />
      
      {/* Additional stats grid */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-gray-900/90 rounded-b-lg p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="grid grid-cols-3 gap-2 text-xs text-white/80">
          <div className="text-center">
            <div className="text-yellow-400 font-semibold">{stats.matchesPlayed}</div>
            <div>Matches</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-semibold">{(stats.minutesPlayed / 90).toFixed(1)}</div>
            <div>Full Games</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-semibold">{stats.keyPasses}</div>
            <div>Key Passes</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
