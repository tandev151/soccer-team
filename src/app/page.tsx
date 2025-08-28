'use client';
import dynamic from 'next/dynamic';
import { Suspense, useState, useCallback, useMemo } from 'react';
import { Carousel } from '@/components/Carousel/Carousel';
import { anphuPlayers } from '@/constants/squash';

// Lazy load the Card component for better performance
const Card = dynamic(
  () => import('@/components/Card/Card').then((mod) => ({ default: mod.Card })),
  {
    ssr: true,
    loading: () => (
      <div className='w-[280px] sm:w-[250px] h-[400px] bg-gradient-to-bl from-purple-200 to-red-200 rounded-tl-3xl rounded-br-3xl animate-pulse'>
        <div className='flex justify-center items-center h-full'>
          <div className='text-gray-500'>Loading...</div>
        </div>
      </div>
    )
  }
);

// Team achievements data
const teamAchievements = [
  {
    title: 'League Champions',
    year: '2024',
    description: 'Won the district championship with an unbeaten record',
    icon: '🏆'
  },
  {
    title: 'Top Scorer Award',
    year: '2024',
    description: 'Cong Danh led the league with 28 goals',
    icon: '⚽'
  },
  {
    title: 'Best Team Spirit',
    year: '2024',
    description: 'Recognized for outstanding teamwork and sportsmanship',
    icon: '🤝'
  },
  {
    title: 'Fair Play Award',
    year: '2024-2025',
    description: 'Lowest number of disciplinary actions in the league',
    icon: '🏅'
  }
];

// Featured Team Achievements Component
const TeamAchievements = () => {
  return (
    <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4'>
          🏆 Team Achievements
        </h2>
        <p className='text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto'>
          Celebrating our journey of excellence, teamwork, and dedication on and
          off the field
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
        {teamAchievements.map((achievement, index) => (
          <div
            key={index}
            className='group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden'>
            <div className='p-6 text-center'>
              <div className='text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                {achievement.icon}
              </div>
              <h3 className='text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300'>
                {achievement.title}
              </h3>
              <div className='text-sm font-semibold text-orange-600 mb-3 bg-orange-50 rounded-full px-3 py-1 inline-block'>
                {achievement.year}
              </div>
              <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                {achievement.description}
              </p>
            </div>
            <div className='h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  // Memoize carousel options for performance
  const carouselOptions = useMemo(() => ({}), []);

  // Optimize player card rendering with useCallback
  const renderPlayerCard = useCallback(
    (player: (typeof anphuPlayers)[0], isSelected: boolean) => (
      <Suspense
        fallback={
          <div className='w-[280px] sm:w-[250px] h-[400px] bg-gradient-to-bl from-purple-200 to-red-200 rounded-tl-3xl rounded-br-3xl animate-pulse'>
            <div className='flex justify-center items-center h-full'>
              <div className='text-gray-500'>Loading...</div>
            </div>
          </div>
        }>
        <Card
          playerData={player}
          isSelected={isSelected}
          className='embla__slide__item'
        />
      </Suspense>
    ),
    []
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Hero Section with Team Achievements */}

      {/* Players Carousel Section */}
      <div className='pb-16 px-3'>
        <div className='text-center mb-8 px-4'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4'>
            ⚽ Meet Our Players
          </h2>
          <p className='text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto'>
            Discover the talented individuals who make An Phu F.C exceptional
          </p>
        </div>

        <Carousel items={anphuPlayers} options={carouselOptions}>
          {renderPlayerCard}
        </Carousel>
      </div>

      <div className='pt-8 pb-12'>
        <TeamAchievements />
      </div>
    </div>
  );
}
