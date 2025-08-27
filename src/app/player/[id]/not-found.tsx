'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        {/* 404 Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl font-bold text-gray-600"
        >
          404
        </motion.div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">Player Not Found</h1>
          <p className="text-xl text-gray-400 max-w-md mx-auto">
            The player you are looking for does not exist or has been removed from our database.
          </p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Back to Team
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="border border-gray-600 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Go Back
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 left-20 w-20 h-20 border border-gray-700 rounded-full opacity-20"
        />
        
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-20 right-20 w-16 h-16 border border-gray-700 rounded-full opacity-20"
        />
      </motion.div>
    </div>
  );
}
