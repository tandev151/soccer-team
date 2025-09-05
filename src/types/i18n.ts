import { useTranslations } from 'next-intl';

// More specific types for our message namespaces
export type HomeTranslationFunction = ReturnType<typeof useTranslations<'Home'>>;
export type PlayerTranslationFunction = ReturnType<typeof useTranslations<'Player'>>;

// Union type for all possible translation functions
export type AnyTranslationFunction = HomeTranslationFunction | PlayerTranslationFunction;
