'use client';

import { Player } from '@/constants/squash';
import { motion } from 'framer-motion';
// Simple icons as SVG components
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9H4.5C3.10444 9 2.40665 9 1.83886 9.29289C1.26872 9.58579 0.914213 10.0858 0.621447 10.6539C0.5 11 0.5 11.5 0.5 12.5C0.5 13.8807 1.61929 15 3 15C4.38071 15 5.5 13.8807 5.5 12.5V9H6Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M18 9H19.5C20.8956 9 21.5933 9 22.1611 9.29289C22.7313 9.58579 23.0858 10.0858 23.3786 10.6539C23.5 11 23.5 11.5 23.5 12.5C23.5 13.8807 22.3807 15 21 15C19.6193 15 18.5 13.8807 18.5 12.5V9H18Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 9V10.5C6 14.6421 9.35786 18 13.5 18V18C17.6421 18 21 14.6421 21 10.5V9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 18V22M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 7H22V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
import React from 'react';

interface PlayerInfoCardProps {
  player: Player;
}

export const PlayerInfoCard: React.FC<PlayerInfoCardProps> = ({ player }) => {
  const infoItems = [
    {
      icon: <UsersIcon />,
      label: 'Height / Weight',
      value: `${player.height}cm / ${player.weight}kg`,
      color: 'text-blue-400',
    },
    {
      icon: <TargetIcon />,
      label: 'Nationality',
      value: player.nationality,
      color: 'text-green-400',
    },
    {
      icon: <TrophyIcon />,
      label: 'Preferred Foot',
      value: player.preferredFoot,
      color: 'text-yellow-400',
    },
    {
      icon: <TrendingUpIcon />,
      label: 'Market Value',
      value: `€${player.marketValue}M`,
      color: 'text-purple-400',
    },
  ];

  const ratingColor = (rating: number) => {
    if (rating >= 90) return 'text-green-400';
    if (rating >= 80) return 'text-blue-400';
    if (rating >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Info Cards */}
      {infoItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 * index }}
          className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-4 border border-gray-600"
        >
          <div className={`flex items-center space-x-2 ${item.color} mb-2`}>
            {item.icon}
            <span className="text-sm text-gray-300">{item.label}</span>
          </div>
          <p className="text-white font-semibold">{item.value}</p>
        </motion.div>
      ))}

      {/* Ratings */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="md:col-span-2 lg:col-span-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-center">
            <h4 className="text-white/80 text-sm mb-1">Overall Rating</h4>
            <motion.div
              className={`text-4xl font-bold ${ratingColor(player.currentStats.overallRating)}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {player.currentStats.overallRating}
            </motion.div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-center">
            <h4 className="text-white/80 text-sm mb-1">Current Form</h4>
            <motion.div
              className={`text-4xl font-bold ${ratingColor(player.currentStats.formRating)}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              {player.currentStats.formRating}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
