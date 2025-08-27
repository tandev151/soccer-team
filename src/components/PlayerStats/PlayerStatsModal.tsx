'use client';

import { Player } from '@/constants/squash';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
// import { X } from 'lucide-react';
import React from 'react';
import { AttributesRadarChart } from './AttributesRadarChart';
import { StatsBarChart } from './StatsBarChart';
import { CareerStatsChart } from './CareerStatsChart';
import { PlayerInfoCard } from './PlayerInfoCard';

interface PlayerStatsModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlayerStatsModal: React.FC<PlayerStatsModalProps> = ({
  player,
  isOpen,
  onClose,
}) => {
  if (!player) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3 
            }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header với gradient */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.img
                    src={player.imageSrc}
                    alt={`${player.firstName} ${player.lastName}`}
                    className="w-16 h-16 rounded-full border-4 border-white/20 object-cover"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  />
                  <div>
                    <motion.h2 
                      className="text-3xl font-bold text-white"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {player.firstName} {player.lastName}
                    </motion.h2>
                    <motion.p 
                      className="text-white/80"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      #{player.number} • {player.position} • {player.age} years old
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Player Info Grid */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <PlayerInfoCard player={player} />
              </motion.div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Attributes Radar Chart */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
                >
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Player Attributes
                  </h3>
                  <AttributesRadarChart attributes={player.attributes} />
                </motion.div>

                {/* Current Stats Bar Chart */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
                >
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Season Statistics
                  </h3>
                  <StatsBarChart stats={player.currentStats} />
                </motion.div>
              </div>

              {/* Career Stats Chart */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Career Progress
                </h3>
                <CareerStatsChart careerStats={player.careerStats} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
