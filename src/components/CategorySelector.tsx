'use client';

import { LegalCategory, LEGAL_CATEGORIES } from '@/types';

interface CategorySelectorProps {
  selected: LegalCategory;
  onSelect: (category: LegalCategory) => void;
  disabled?: boolean;
}

export default function CategorySelector({
  selected,
  onSelect,
  disabled = false,
}: CategorySelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#a0a0b8] mb-3">
        Filter by Legal Category
      </label>
      <div className="flex flex-wrap gap-2">
        {LEGAL_CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => onSelect(category.value)}
            disabled={disabled}
            className={`
              px-4 py-2.5 text-sm font-medium rounded-xl
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                selected === category.value
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-[#1a1a24] text-[#a0a0b8] border border-[rgba(255,255,255,0.08)] hover:border-emerald-500/50 hover:text-white'
              }
            `}
          >
            <span className="mr-1.5">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
