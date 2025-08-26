'use client';
import { Card } from '@/components/Card/Card';
import { Carousel } from '@/components/Carousel/Carousel';
import { anphuPlayers } from '@/constants/squash';
import { Footer } from './layout/Footer';

export default function Home() {
  return (

        <Carousel items={anphuPlayers} options={{}}>
          {(player, isSelected) => (
            <Card
              playerData={player}
              isSelected={isSelected}
              className='embla__slide__item'
            />
          )}
        </Carousel>
    
  );
}
