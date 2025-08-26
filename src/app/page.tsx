'use client';
import { Card, Player } from '@/components/Card/Card';
import { Carousel } from '@/components/Carousel/Carousel';
import Image from 'next/image';

// 1. Tạo dữ liệu mẫu
const playersData: Player[] = [
  {
    id: 1,
    firstName: 'Leo',
    lastName: 'Messi',
    number: 10,
    imageSrc: '/messi.png',
    logo: 'LM',
    position: 'LM'
  },
  {
    id: 2,
    firstName: 'Cristiano',
    lastName: 'Ronaldo',
    number: 7,
    imageSrc: '/messi.png',
    logo: 'CR',
    position: 'LM'
  },
  {
    id: 3,
    firstName: 'Neymar',
    lastName: 'Jr',
    number: 11,
    imageSrc: '/messi.png',
    logo: 'NJ',
    position: 'LM'
  },
  {
    id: 4,
    firstName: 'Kylian',
    lastName: 'Mbappé',
    number: 9,
    imageSrc: '/messi.png',
    logo: 'KM',
    position: 'LM'
  },
  {
    id: 5,
    firstName: 'Kylian',
    lastName: 'Mbappé',
    number: 9,
    imageSrc: '/messi.png',
    logo: 'KM',
    position: 'LM'
  },
  {
    id: 6,
    firstName: 'Kylian',
    lastName: 'Mbappé',
    number: 9,
    imageSrc: '/messi.png',
    logo: 'KM',
    position: 'LM'
  }
  // Thêm các cầu thủ khác...
];

export default function Home() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <Carousel items={playersData} options={{}}>
          {(player, isSelected) => (
            <Card
              playerData={player}
              isSelected={isSelected}
              className='embla__slide__item'
            />
          )}
        </Carousel>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          <Image
            aria-hidden
            src='/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          <Image
            aria-hidden
            src='/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          <Image
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
