// components/Card.jsx
'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  className?: string;
  playerData: Player;
  isSelected?: boolean;
};

// 1. Định nghĩa kiểu dữ liệu cho một cầu thủ (ví dụ)
export type Player = {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  imageSrc: string;
  position: string;
  logo: string;
};

const Card = ({ className, playerData, isSelected }: Props) => {
  // Bước 1: Sử dụng useState để quản lý trạng thái ACTIVE
  const [isActive, setIsActive] = useState(false);

  // Hàm để chuyển đổi trạng thái khi nhấp vào thẻ
  const handleCardClick = () => {
    if (!isSelected) {
      return;
    }
    setIsActive(!isActive);
  };

  return (
    // Container chính cho hiệu ứng 3D, thêm 'group' để kích hoạt hiệu ứng hover cho các phần tử con
    <div
      className={cn(
        'group w-[250px] h-[400px] bg-transparent',
        className,
        isSelected ? '' : 'opacity-50'
      )}
      style={{ perspective: '1000px' }} // Thuộc tính này cần thiết cho hiệu ứng 3D
      onClick={handleCardClick}>
      {/* Wrapper cho hiệu ứng lật. Trạng thái 'isActive' sẽ thêm class để xoay thẻ */}
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
        style={{ transformStyle: 'preserve-3d' }} // Giữ lại hiệu ứng 3D cho các phần tử con
        // Áp dụng transform rotateY khi isActive là true
        {...(isActive && {
          style: { transform: 'rotateY(180deg)', transformStyle: 'preserve-3d' }
        })}>
        {/* === MẶT TRƯỚC CỦA THẺ (TRẠNG THÁI DEFAULT & HOVER) === */}
        <div
          className={cn(
            'absolute w-full h-full p-2 box-border transition-transform duration-700 ease-in-out bg-gradient-to-bl from-orange-200 to-red-400 border-none  rounded-tl-3xl rounded-br-3xl',
            isSelected ? 'cursor-pointer' : ''
          )}
          style={{ backfaceVisibility: 'hidden' }} // Ẩn mặt này đi khi nó quay về phía sau
        >
          {/* Lớp nền gradient */}
          <div className='relative bg-transparent w-full h-full opacity-60'></div>
          {/* Logo 'MF' */}
          <div className='absolute top-[20px] right-2 bg-gradient-to-bl from-orange-900 to-red-400 w-[50px] h-[30px] rounded-4xl flex justify-center items-center font-bold text-white'>
            {playerData?.position}
          </div>
          {/* Nội dung chính của mặt trước */}
          <div className='absolute top-0 left-0 right-0 flex flex-col items-center w-full '>
            {/* Vùng chứa hình ảnh cầu thủ */}
            <div
              className={cn(
                'mt-12 w-[280px] h-[280px] transition-transform duration-500',
                isSelected
                  ? 'scale-150 translate-y-2 group-hover:scale-180 group-hover:-translate-y-5'
                  : ''
              )}>
              <Image
                src='/messi.png' // Hãy chắc chắn bạn có ảnh này trong thư mục /public
                alt='Lionel Messi'
                width={300}
                height={500}
                className='w-full h-full object-contain'
              />
            </div>

            {/* Thông tin cầu thủ */}
            <div className='absolute bottom-[-50px] flex flex-col items-center bg-transparent w-full rounded-tl-lg rounded-br-lg z-10 p-2'>
              <div
                className={cn(
                  'absolute -top-8 rounded-full bg-red-900 font-bold text-2xl text-white w-[60px] h-[60px] flex justify-center items-center border-4 border-orange-200',
                  isSelected
                    ? 'transition-all duration-300 [text-shadow:1px_1px_2px_#78350f group-hover:[box-shadow:0_0_1px_#fff,0_0_10px_#fff,0_0_15px_#f59e0b,0_0_20px_#f59e0b] group-hover:[text-shadow:0_0_1px_#fff,0_0_10px_#fff,0_0_15px_#f59e0b,0_0_20px_#f59e0b]'
                    : ''
                )}>
                {playerData.number}
              </div>
              <div
                className={cn(
                  'mt-6 text-2xl font-semibold text-shadow-amber-900',
                  isSelected
                    ? 'transition-all duration-300 [text-shadow:1px_1px_2px_#78350f] group-hover:text-white group-hover:[text-shadow:0_0_1px_#fff,0_0_10px_#fff,0_0_15px_#f59e0b,0_0_20px_#f59e0b]'
                    : ''
                )}>
                {playerData.firstName}
              </div>
              <div
                className={cn(
                  'text-4xl font-semibold text-amber-800 ',
                  isSelected
                    ? 'transition-all duration-300 [text-shadow:1px_1px_2px_#78350f] group-hover:text-white group-hover:[text-shadow:0_0_1px_#fff,0_0_10px_#fff,0_0_15px_#f59e0b,0_0_20px_#f59e0b]'
                    : ''
                )}>
                {playerData.lastName}
              </div>
            </div>
          </div>
        </div>

        {/* === MẶT SAU CỦA THẺ (TRẠNG THÁI ACTIVE) === */}
        <div
          className='absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-tl-3xl rounded-br-3xl p-6 text-white'
          style={{
            backfaceVisibility: 'hidden', // Ẩn mặt này đi khi nó ở phía trước
            transform: 'rotateY(180deg)' // Xoay sẵn 180 độ
          }}>
          <h3 className='text-center text-2xl font-bold border-b pb-2 mb-4'>
            Stats 2024/25
          </h3>
          <ul className='space-y-3'>
            <li className='flex justify-between'>
              <span className='font-semibold'>Matches Played:</span>{' '}
              <span>35</span>
            </li>
            <li className='flex justify-between'>
              <span className='font-semibold'>Goals:</span> <span>30</span>
            </li>
            <li className='flex justify-between'>
              <span className='font-semibold'>Assists:</span> <span>25</span>
            </li>
            <li className='flex justify-between'>
              <span className='font-semibold'>Dribbles/Game:</span>{' '}
              <span>4.7</span>
            </li>
            <li className='flex justify-between'>
              <span className='font-semibold'>Pass Accuracy:</span>{' '}
              <span>87%</span>
            </li>
          </ul>
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400'>
            Click to flip back
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card };
