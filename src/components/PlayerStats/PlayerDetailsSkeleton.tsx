'use client';

import React from 'react';

export const PlayerDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Player Image Skeleton */}
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gray-600 p-4">
                <div className="w-full h-full bg-gray-500 rounded-full"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gray-500 rounded-full"></div>
            </div>

            {/* Player Info Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="h-16 bg-gray-600 rounded-lg w-3/4"></div>
              <div className="h-12 bg-gray-600 rounded-lg w-2/3"></div>
              <div className="flex gap-4">
                <div className="h-8 bg-gray-600 rounded-full w-32"></div>
                <div className="h-8 bg-gray-600 rounded-full w-24"></div>
                <div className="h-8 bg-gray-600 rounded-full w-28"></div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-600 rounded-lg p-4 h-20"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Button Skeleton */}
        <div className="absolute top-6 left-6">
          <div className="h-10 w-32 bg-gray-600 rounded-lg"></div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Player Info Grid Skeleton */}
        <section>
          <div className="h-10 bg-gray-700 rounded-lg w-64 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-4 h-32"></div>
            ))}
          </div>
        </section>

        {/* Attributes Section Skeleton */}
        <section className="bg-gray-800 rounded-2xl p-8">
          <div className="h-10 bg-gray-700 rounded-lg w-80 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-80 bg-gray-700 rounded-lg"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="h-8 bg-gray-700 rounded-lg w-48 mb-6"></div>
            <div className="h-80 bg-gray-700 rounded-lg"></div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="h-8 bg-gray-700 rounded-lg w-48 mb-6"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Progress Skeleton */}
        <section className="bg-gray-800 rounded-2xl p-8">
          <div className="h-10 bg-gray-700 rounded-lg w-64 mx-auto mb-8"></div>
          <div className="h-80 bg-gray-700 rounded-lg"></div>
        </section>
      </div>
    </div>
  );
};
