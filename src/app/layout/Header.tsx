'use client'

import LanguageSwicher from '@/components/LanguageSwitcher/LanguageSwicher';
import Image from 'next/image';
import { useState } from 'react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-red-600 shadow-lg">
      <div className="container mx-auto px-4 py-4 relative">
        {/* Mobile Layout (sm and md) */}
        <div className="flex items-center justify-between md:hidden ">
          {/* Menu Icon - Left */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo - Center */}
          <div className="flex items-center space-x-2">
            <Image
              src="/an-phu-logo.png"
              width={40}
              height={40}
              alt="An Phu F.C Logo"
              className="rounded-lg shadow-md"
            />
            <div className="text-white text-center">
              <h1 className="text-lg font-bold">AN PHU F.C</h1>
            </div>
          </div>

          {/* Language Switcher - Right */}
          <div className="flex items-center">
            <LanguageSwicher />
          </div>
        </div>

        {/* Desktop Layout (lg and above) */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/an-phu-logo.png"
              width={60}
              height={60}
              alt="An Phu F.C Logo"
              className="rounded-lg shadow-md"
            />
            <div className="text-white">
              <h1 className="text-2xl font-bold">AN PHU F.C</h1>
              <p className="text-sm opacity-90">Football Club</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-10">
            <a href="/" className="text-white hover:text-yellow-300 transition-colors text-lg font-semibold tracking-wide">
              Home
            </a>
            <a href="/team" className="text-white hover:text-yellow-300 transition-colors text-lg font-semibold tracking-wide">
              Team
            </a>
            <a href="/matches" className="text-white hover:text-yellow-300 transition-colors text-lg font-semibold tracking-wide">
              Matches
            </a>
            <a href="/news" className="text-white hover:text-yellow-300 transition-colors text-lg font-semibold tracking-wide">
              News
            </a>
            <a href="/about" className="text-white hover:text-yellow-300 transition-colors text-lg font-semibold tracking-wide">
              About
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSwicher />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-white/20 pt-4">
            <nav className="flex flex-col space-y-3">
              <a href="/" className="text-white hover:text-yellow-300 transition-colors py-2 text-base font-medium">
                Home
              </a>
              <a href="/team" className="text-white hover:text-yellow-300 transition-colors py-2 text-base font-medium">
                Team
              </a>
              <a href="/matches" className="text-white hover:text-yellow-300 transition-colors py-2 text-base font-medium">
                Matches
              </a>
              <a href="/news" className="text-white hover:text-yellow-300 transition-colors py-2 text-base font-medium">
                News
              </a>
              <a href="/about" className="text-white hover:text-yellow-300 transition-colors py-2 text-base font-medium">
                About
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
