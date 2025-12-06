import { Scale, Heart, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[rgba(255,255,255,0.06)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Law<span className="gradient-text-emerald">Bridge</span>
              </span>
            </div>
            <p className="text-sm text-[#6a6a80] max-w-md leading-relaxed">
              Making legal information accessible to everyone through AI-powered,
              plain-language explanations backed by authoritative sources.
            </p>
            <div className="flex gap-3 mt-4">
              <a 
                href="https://github.com/rudraymehra/LawBridge" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1a1a24] hover:bg-[#22222e] text-[#6a6a80] hover:text-white rounded-lg transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-[#1a1a24] hover:bg-[#22222e] text-[#6a6a80] hover:text-white rounded-lg transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-[#6a6a80] hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[#6a6a80] hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-[#6a6a80] hover:text-emerald-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-[#6a6a80] hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#6a6a80] hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-[#6a6a80] hover:text-emerald-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6a6a80]">
            &copy; {new Date().getFullYear()} LawBridge. All rights reserved.
          </p>
          <p className="text-xs text-[#6a6a80] flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500" aria-hidden="true" /> for accessible legal information
          </p>
        </div>

        {/* Important disclaimer */}
        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <p className="text-xs text-amber-300/80 text-center">
            <strong className="text-amber-300">Important:</strong> LawBridge provides general
            legal information for educational purposes only. It is not a substitute for
            professional legal advice from a qualified attorney. Always consult with a lawyer
            for specific legal matters.
          </p>
        </div>
      </div>
    </footer>
  );
}
