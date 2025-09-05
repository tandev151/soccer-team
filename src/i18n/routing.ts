import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from '../constants/config';

export const routing = defineRouting({
  locales,
  defaultLocale
});
