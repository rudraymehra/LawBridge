'use client';

import { Citation } from '@/types';
import { ExternalLink, FileText, Link2 } from 'lucide-react';

interface CitationListProps {
  citations: Citation[];
}

export default function CitationList({ citations }: CitationListProps) {
  if (!citations || citations.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <Link2 className="w-4 h-4 text-emerald-400" />
        Sources ({citations.length})
      </h3>
      <ul className="space-y-2">
        {citations.map((citation) => (
          <li key={citation.id} className="group">
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 rounded-xl
                         bg-[#1a1a24] hover:bg-[#22222e]
                         border border-[rgba(255,255,255,0.06)] hover:border-emerald-500/30
                         transition-all duration-200"
            >
              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center
                               bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg
                               border border-emerald-500/30">
                {citation.id}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-emerald-400
                              truncate transition-colors">
                  {citation.title}
                </p>
                {citation.snippet && (
                  <p className="text-xs text-[#6a6a80] mt-1.5 line-clamp-2">
                    {citation.snippet}
                  </p>
                )}
              </div>
              <ExternalLink className="w-4 h-4 text-[#6a6a80] group-hover:text-emerald-400
                                       flex-shrink-0 transition-colors" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
