import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import './globals.css';
import { locales } from '@/constants/config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'An Phu F.C - Football Club',
  description:
    'Official website of An Phu Football Club - Passion, Pride, Performance'
};

export default async function RootLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  // Ensure that the incoming locale is valid
  const { locale } = await params;
  if (!hasLocale(locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html className='theme-light'>
      <NextIntlClientProvider locale={locale}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}>
          <main className='flex-1'>{children}</main>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
