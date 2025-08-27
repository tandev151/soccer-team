'use client';

import { PlayerAttributes } from '@/constants/squash';
import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface AttributesRadarChartProps {
  attributes: PlayerAttributes;
}

export const AttributesRadarChart: React.FC<AttributesRadarChartProps> = ({ 
  attributes 
}) => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physicality'],
    datasets: [
      {
        label: 'Attributes',
        data: [
          attributes.pace,
          attributes.shooting,
          attributes.passing,
          attributes.dribbling,
          attributes.defending,
          attributes.physicality,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue-500 with opacity
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.1,
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
        backgroundColor: 'rgba(17, 24, 39, 0.95)', // gray-900
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed.r}/100`;
          }
        }
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          color: 'rgba(156, 163, 175, 0.8)', // gray-400
          font: {
            size: 12,
          },
          backdropColor: 'transparent',
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)', // gray-600 with opacity
          lineWidth: 1,
        },
        angleLines: {
          color: 'rgba(75, 85, 99, 0.3)',
          lineWidth: 1,
        },
        pointLabels: {
          color: 'rgba(243, 244, 246, 1)', // gray-100
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
      delay: 500,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative h-80"
    >
      <Radar ref={chartRef} data={data} options={options} />
      
      {/* Attribute values overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
          {Object.entries(attributes).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex justify-between bg-gray-900/80 rounded px-2 py-1"
            >
              <span className="capitalize">{key}:</span>
              <span className="font-semibold text-blue-400">{value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
