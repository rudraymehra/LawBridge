'use client';

import { Scale, Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                <Scale className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">
              Law<span className="gradient-text-emerald">Bridge</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <Link
              href="/"
              className="ml-4 btn-primary inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl"
            >
              <Sparkles className="w-4 h-4" />
              Ask a Question
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#a0a0b8] hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(255,255,255,0.06)] animate-fadeIn">
            <nav className="flex flex-col gap-1">
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="/faq" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </MobileNavLink>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 btn-primary flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-xl"
              >
                <Sparkles className="w-4 h-4" />
                Ask a Question
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium text-[#a0a0b8] hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-all duration-200"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 text-sm font-medium text-[#a0a0b8] hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}
