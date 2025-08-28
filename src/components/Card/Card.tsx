// components/Card.jsx
'use client';

import { Player } from '@/constants/squash';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { memo } from 'react';

type Props = {
  className?: string;
  playerData: Player;
  isSelected?: boolean;
};

const Card = memo(({ className, playerData, isSelected }: Props) => {
  const router = useRouter();

  // Hàm để chuyển đổi trạng thái khi nhấp vào thẻ - navigate to player detail
  const handleCardClick = () => {
    if (!isSelected) {
      return;
    }
    // Navigate to player detail page instead of flipping card
    router.push(`/player/${playerData.id}`);
  };

  return (
    // Container chính cho hiệu ứng 3D, thêm 'group' để kích hoạt hiệu ứng hover cho các phần tử con
    <div
      className={cn(
        'group w-[280px] sm:w-[250px] h-[400px] bg-transparent',
        className,
        isSelected ? '' : 'opacity-50'
      )}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      tabIndex={isSelected ? 0 : -1}
      role={isSelected ? 'button' : 'presentation'}
      aria-label={
        isSelected
          ? `View details for ${playerData.firstName} ${playerData.lastName}`
          : undefined
      }>
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out `}>
        <div
          className={cn(
            'absolute w-full h-full p-2 box-border transition-transform duration-700 ease-in-out  bg-gradient-to-bl from-purple-200 to-red-200 border-none  rounded-tl-3xl rounded-br-3xl',
            isSelected ? 'cursor-pointer' : ''
          )}>
          {/* Lớp nền gradient */}
          <div className='relative bg-transparent w-full h-full bg-[url(/an-phu-logo.png)] bg-contain bg-no-repeat'></div>
          {/* Logo 'MF' */}
          <div className='absolute top-[20px] right-2 bg-gradient-to-bl from-orange-900 to-red-400 px-2 min-w-[50px] h-[30px] rounded-4xl flex justify-center items-center font-bold text-white'>
            {playerData?.position}
          </div>
          {/* Nội dung chính của mặt trước */}
          <div className='absolute top-0 left-0 right-0 flex flex-col items-center w-full '>
            {/* Vùng chứa hình ảnh cầu thủ - Enhanced responsive */}
            <div
              className={cn(
                'mt-8 sm:mt-12 w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] transition-transform duration-500',
                isSelected
                  ? 'scale-110 sm:scale-150 translate-y-1 sm:translate-y-2'
                  : ''
              )}>
              <Image
                src={playerData?.imageSrc}
                alt={`${playerData?.firstName} ${playerData?.lastName} - ${playerData?.position}`}
                width={300}
                height={500}
                priority={isSelected} // Load selected images with priority
                loading={isSelected ? 'eager' : 'lazy'} // Lazy load non-selected images
                placeholder='blur'
                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyDjNztdV1HTnRwJoI9RzGYI9LCzWGJ0iBtG5B+6dXa2IzVa+YB/B8UR4JfvGkuCf3okAIw/'
                className='w-full h-full object-contain transition-opacity duration-300'
                sizes='(max-width: 640px) 240px, 280px'
              />
            </div>

            {/* Thông tin cầu thủ - Enhanced responsive */}
            <div className='absolute bottom-[-40px] sm:bottom-[-50px] flex flex-col items-center bg-transparent w-full rounded-tl-lg rounded-br-lg z-10 p-2'>
              <div
                className={cn(
                  'absolute -top-6 sm:-top-8 rounded-full bg-red-900 font-bold text-lg sm:text-2xl text-white w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex justify-center items-center border-2 sm:border-4 border-orange-200',
                  isSelected
                    ? 'transition-all duration-300 [text-shadow:1px_1px_2px_#78350f] group-hover:[box-shadow:0_0_1px_#fff,0_0_10px_#fff,0_0_15px_#f59e0b,0_0_20px_#f59e0b] group-hover:[text-shadow:0_0_1px_#fff,0_0_10px_#fff,0_0_15px_#f59e0b,0_0_20px_#f59e0b]'
                    : ''
                )}>
                {playerData.number}
              </div>
              <div
                className={cn(
                  'mt-4 sm:mt-6 text-lg sm:text-2xl font-semibold text-shadow-amber-900 text-center',
                  isSelected
                    ? 'transition-all duration-300 [text-shadow:1px_1px_2px_#78350f] group-hover:text-white group-hover:[text-shadow:0_0_1px_#000,0_0_10px_#000,0_0_15px_#f59e0b,0_0_20px_#f59e0b]'
                    : ''
                )}>
                {playerData.firstName}
              </div>
              <div
                className={cn(
                  'text-2xl sm:text-4xl font-semibold text-amber-800 text-center',
                  isSelected
                    ? 'transition-all duration-300 [text-shadow:1px_1px_2px_#78350f] group-hover:text-white group-hover:[text-shadow:0_0_1px_#000,0_0_10px_#000,0_0_15px_#f59e0b,0_0_20px_#f59e0b]'
                    : ''
                )}>
                {playerData.lastName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Add display name for better debugging
Card.displayName = 'Card';

export { Card };
