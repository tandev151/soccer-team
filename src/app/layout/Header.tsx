import LanguageSwicher from '@/components/LanguageSwitcher/LanguageSwicher';
import Image from 'next/image';
import React from 'react';

export const Header = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex'>
        <Image
          src={
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fseeklogo.com%2Ffree-vector-logos%2Ffootball&psig=AOvVaw0t3OXqnCqMN73FQ8y7gFpe&ust=1756206821766000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiW6bDqpY8DFQAAAAAdAAAAABAE'
          }
          width={20}
          height={20}
          alt='Logo'
        />
      </div>
      <div className='flex'>
        <LanguageSwicher />
      </div>
    </div>
  );
};
