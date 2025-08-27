import type { Metadata } from 'next';
import { anphuPlayers } from '@/constants/squash';

interface PlayerLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PlayerLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const player = anphuPlayers.find(p => p.id === parseInt(id));
  
  if (!player) {
    return {
      title: 'Player Not Found - An Phu F.C',
      description: 'The requested player could not be found.',
    };
  }

  return {
    title: `${player.firstName} ${player.lastName} - An Phu F.C`,
    description: `Detailed statistics and information about ${player.firstName} ${player.lastName}, ${player.position} player for An Phu Football Club.`,
    openGraph: {
      title: `${player.firstName} ${player.lastName} - An Phu F.C`,
      description: `View detailed stats for ${player.firstName} ${player.lastName}`,
      images: [
        {
          url: player.imageSrc,
          width: 400,
          height: 400,
          alt: `${player.firstName} ${player.lastName}`,
        },
      ],
    },
  };
}

export default function PlayerLayout({ children }: PlayerLayoutProps) {
  return children;
}
