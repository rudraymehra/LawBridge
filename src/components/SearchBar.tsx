'use client';

import { useState, FormEvent, KeyboardEvent } from 'react';
import { Search, Loader2, Sparkles, Command } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  isLoading = false,
  placeholder = 'Ask a legal question... (e.g., "What are my rights as a tenant?")',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.01]' : ''}`}>
        {/* Animated gradient border */}
        <div 
          className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 opacity-0 blur-sm transition-all duration-500 ${
            isFocused ? 'opacity-60 animate-gradient' : ''
          }`} 
          style={{ backgroundSize: '200% 200%' }}
        />

        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isLoading}
            rows={2}
            className="w-full px-5 py-5 pr-20 text-base md:text-lg 
                       bg-[#1a1a24] text-white
                       border-2 border-[rgba(255,255,255,0.08)]
                       rounded-2xl resize-none
                       focus:outline-none focus:border-emerald-500/50
                       disabled:opacity-50 disabled:cursor-not-allowed
                       placeholder:text-[#6a6a80]
                       transition-all duration-300"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-3.5
                       text-white rounded-xl
                       transition-all duration-300
                       disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#1a1a24]
                       ${isLoading || !query.trim()
                         ? 'bg-[#2a2a3a] text-[#6a6a80]'
                         : 'btn-primary'
                       }`}
            aria-label="Search"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2 text-[#6a6a80] text-sm">
          <kbd className="px-2 py-1 bg-[#1a1a24] border border-[rgba(255,255,255,0.08)] rounded text-xs font-mono">
            Enter
          </kbd>
          <span>to search</span>
        </div>
        <span className="text-[#3a3a4a]">|</span>
        <div className="flex items-center gap-2 text-[#6a6a80] text-sm">
          <kbd className="px-2 py-1 bg-[#1a1a24] border border-[rgba(255,255,255,0.08)] rounded text-xs font-mono">
            Shift + Enter
          </kbd>
          <span>for new line</span>
        </div>
      </div>
    </form>
  );
}
