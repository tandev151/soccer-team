'use client';

import { anphuPlayers, Player } from '@/constants/squash';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { lazy, Suspense, memo, use } from 'react';
import { 
  PlayerInfoCard,
  ProgressBar,
  AnimatedCounter 
} from '@/components/PlayerStats';

// Lazy load heavy chart components
const AttributesRadarChart = lazy(() => import('@/components/PlayerStats/AttributesRadarChart').then(module => ({ default: module.AttributesRadarChart })));
const StatsBarChart = lazy(() => import('@/components/PlayerStats/StatsBarChart').then(module => ({ default: module.StatsBarChart })));
const CareerStatsChart = lazy(() => import('@/components/PlayerStats/CareerStatsChart').then(module => ({ default: module.CareerStatsChart })));

// Chart loading skeleton
const ChartSkeleton = memo(() => (
  <div className="h-80 bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-gray-500">Loading chart...</div>
  </div>
));

interface PlayerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PlayerDetailPage({ params }: PlayerDetailPageProps) {
  const { id } = use(params);
  const player = anphuPlayers.find(p => p.id === parseInt(id));

  if (!player) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            {/* Player Image */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-white/10 p-4 backdrop-blur-sm border-4 border-white/20">
                <Image
                  src={player.imageSrc}
                  alt={`${player.firstName} ${player.lastName}`}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Jersey Number */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
              >
                <span className="text-2xl font-bold text-gray-900">{player.number}</span>
              </motion.div>
            </motion.div>

            {/* Player Info */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4"
              >
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-2">
                  {player.firstName}
                </h1>
                <h2 className="text-4xl lg:text-6xl font-bold text-white/90 mb-4">
                  {player.lastName}
                </h2>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-lg text-white/80">
                  <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    Position: {player.position}
                  </span>
                  <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    Age: {player.age}
                  </span>
                  <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    Nation: {player.nationality}
                  </span>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter value={player.currentStats.goals} />
                  </div>
                  <div className="text-white/70">Goals</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter value={player.currentStats.assists} />
                  </div>
                  <div className="text-white/70">Assists</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter value={player.currentStats.matchesPlayed} />
                  </div>
                  <div className="text-white/70">Matches</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-yellow-400">
                    <AnimatedCounter value={player.currentStats.overallRating} />
                  </div>
                  <div className="text-white/70">Rating</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-6 left-6"
        >
          <Link
            href="/"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Team
          </Link>
        </motion.div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Player Info Grid */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Player Information</h3>
          <PlayerInfoCard player={player} />
        </motion.section>

        {/* Attributes Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
            Player Attributes
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Radar Chart */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Skill Overview</h4>
              <Suspense fallback={<ChartSkeleton />}>
                <AttributesRadarChart attributes={player.attributes} />
              </Suspense>
            </div>
            
            {/* Progress Bars */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Detailed Attributes</h4>
              <div className="space-y-4">
                {Object.entries(player.attributes).map(([key, value], index) => (
                  <ProgressBar
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    delay={index * 0.1}
                    className="bg-gray-700/50 p-4 rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Statistics Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Current Season Stats */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              Season Statistics
            </h3>
            <Suspense fallback={<ChartSkeleton />}>
              <StatsBarChart stats={player.currentStats} />
            </Suspense>
          </div>

          {/* Additional Stats Grid */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
              Advanced Stats
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <ProgressBar
                  label="Pass Accuracy"
                  value={player.currentStats.passAccuracy}
                  delay={0.1}
                />
                <ProgressBar
                  label="Shot Accuracy"
                  value={player.currentStats.shotAccuracy}
                  delay={0.2}
                />
                <ProgressBar
                  label="Dribble Success"
                  value={player.currentStats.dribbleSuccess}
                  delay={0.3}
                />
              </div>
              <div className="space-y-4">
                <ProgressBar
                  label="Tackle Success"
                  value={player.currentStats.tackleSuccess}
                  delay={0.4}
                />
                <ProgressBar
                  label="Sprint Speed"
                  value={Math.round((player.currentStats.sprintSpeed / 35) * 100)}
                  delay={0.5}
                />
                <ProgressBar
                  label="Stamina"
                  value={player.currentStats.stamina}
                  delay={0.6}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Career Progress */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
            Career Progress
          </h3>
          <Suspense fallback={<ChartSkeleton />}>
            <CareerStatsChart careerStats={player.careerStats} />
          </Suspense>
        </motion.section>
      </div>
    </div>
  );
}
