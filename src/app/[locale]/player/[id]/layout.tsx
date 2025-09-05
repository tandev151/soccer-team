import { anphuPlayers } from '@/constants/squash';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface PlayerLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PlayerLayoutProps): Promise<Metadata> {
  const { id, locale } = await params;
  const player = anphuPlayers.find(p => p.id === parseInt(id));
  const t = await getTranslations('Player.metadata');
  
  if (!player) {
    return {
      title: t('notFoundTitle'),
      description: t('notFoundDescription'),
    };
  }

  return {
    title: `${player.firstName} ${player.lastName} - An Phu F.C`,
    description: t('descriptionTemplate', {
      firstName: player.firstName,
      lastName: player.lastName,
      position: player.position
    }),
    openGraph: {
      title: `${player.firstName} ${player.lastName} - An Phu F.C`,
      description: t('ogDescriptionTemplate', {
        firstName: player.firstName,
        lastName: player.lastName
      }),
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
