'use client';

import { PlayerCareerStats } from '@/constants/squash';
import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CareerStatsChartProps {
  careerStats: PlayerCareerStats[];
}

export const CareerStatsChart: React.FC<CareerStatsChartProps> = ({ 
  careerStats 
}) => {
  const chartRef = useRef(null);

  const seasons = careerStats.map(career => career.season);
  const goalsData = careerStats.map(career => career.stats.goals);
  const assistsData = careerStats.map(career => career.stats.assists);
  const overallRatingData = careerStats.map(career => career.stats.overallRating);

  const data = {
    labels: seasons,
    datasets: [
      {
        label: 'Goals',
        data: goalsData,
        borderColor: 'rgba(34, 197, 94, 1)', // green
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Assists',
        data: assistsData,
        borderColor: 'rgba(59, 130, 246, 1)', // blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Overall Rating',
        data: overallRatingData,
        borderColor: 'rgba(168, 85, 247, 1)', // purple
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(243, 244, 246, 1)', // gray-100
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label;
            const value = context.parsed.y;
            if (label === 'Overall Rating') {
              return `${label}: ${value}/100`;
            }
            return `${label}: ${value}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
          lineWidth: 1,
        },
        ticks: {
          color: 'rgba(156, 163, 175, 1)',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        max: Math.max(...goalsData, ...assistsData) + 5,
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
        title: {
          display: true,
          text: 'Goals & Assists',
          color: 'rgba(156, 163, 175, 1)',
          font: {
            size: 14,
            weight: '600',
          },
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        min: 70,
        max: 100,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: 'rgba(156, 163, 175, 1)',
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Overall Rating',
          color: 'rgba(156, 163, 175, 1)',
          font: {
            size: 14,
            weight: '600',
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
      delay: 300,
    },
  };

  // Calculate trends
  const goalsChange = goalsData.length > 1 ? goalsData[goalsData.length - 1] - goalsData[goalsData.length - 2] : 0;
  const assistsChange = assistsData.length > 1 ? assistsData[assistsData.length - 1] - assistsData[assistsData.length - 2] : 0;
  const ratingChange = overallRatingData.length > 1 ? overallRatingData[overallRatingData.length - 1] - overallRatingData[overallRatingData.length - 2] : 0;

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="relative h-80"
    >
      <Line ref={chartRef} data={data} options={options} />
      
      {/* Trend indicators */}
      <motion.div 
        className="absolute top-0 right-0 bg-gray-900/90 rounded-lg p-3 m-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
      >
        <div className="text-xs text-white/80 space-y-1">
          <div className="text-center text-white font-semibold mb-2">Season Trends</div>
          <div className="flex items-center justify-between">
            <span>Goals:</span>
            <span className={`font-semibold ${getTrendColor(goalsChange)}`}>
              {goalsChange > 0 ? '+' : ''}{goalsChange}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Assists:</span>
            <span className={`font-semibold ${getTrendColor(assistsChange)}`}>
              {assistsChange > 0 ? '+' : ''}{assistsChange}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Rating:</span>
            <span className={`font-semibold ${getTrendColor(ratingChange)}`}>
              {ratingChange > 0 ? '+' : ''}{ratingChange}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
