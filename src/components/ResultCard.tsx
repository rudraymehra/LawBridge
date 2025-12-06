'use client';

import { useState } from 'react';
import { SearchResponse } from '@/types';
import CitationList from './CitationList';
import { CheckCircle, AlertCircle, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';

interface ResultCardProps {
  result: SearchResponse | null;
  question: string;
  error?: string | null;
  onNewSearch: () => void;
}

export default function ResultCard({
  result,
  question,
  error,
  onNewSearch,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    if (!result) return;
    
    const textToCopy = `Question: ${question}\n\nAnswer: ${result.summary}\n\nSources:\n${result.sources.map(s => `- ${s.title}: ${s.url}`).join('\n')}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-300 text-lg">Something went wrong</h3>
              <p className="text-red-200/80 mt-1">{error}</p>
              <button
                onClick={onNewSearch}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5
                           bg-red-500/20 hover:bg-red-500/30 text-red-300
                           border border-red-500/30 hover:border-red-500/50
                           rounded-xl text-sm font-medium transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fadeIn">
      <div className="glass-card-dark rounded-3xl overflow-hidden">
        {/* Question header */}
        <div className="bg-[#1a1a24] px-6 py-5 border-b border-[rgba(255,255,255,0.06)]">
          <p className="text-sm text-[#6a6a80] mb-1.5 uppercase tracking-wide font-medium">Your question</p>
          <p className="text-white font-medium text-lg">{question}</p>
        </div>

        {/* Answer section */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-emerald-500/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">AI Answer</h2>
          </div>

          {/* Summary */}
          <div className="prose-dark">
            <div
              className="text-[#a0a0b8] leading-relaxed whitespace-pre-wrap text-base"
              dangerouslySetInnerHTML={{
                __html: formatSummary(result.summary)
              }}
            />
          </div>

          {/* Citations */}
          <CitationList citations={result.sources} />

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-3">
            <button
              onClick={onNewSearch}
              className="btn-primary inline-flex items-center gap-2 px-5 py-3
                         text-white rounded-xl text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Ask Another Question
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="btn-secondary inline-flex items-center gap-2 px-5 py-3
                         text-[#a0a0b8] hover:text-white
                         rounded-xl text-sm font-medium transition-all duration-200"
              aria-label={copied ? 'Copied to clipboard' : 'Copy answer to clipboard'}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Answer
                </>
              )}
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-500/10 px-6 py-4 border-t border-amber-500/20">
          <p className="text-sm text-amber-300/90">
            <strong className="text-amber-300">Disclaimer:</strong> This information is provided for educational purposes only
            and does not constitute legal advice. For specific legal issues, please consult with
            a qualified attorney in your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}

function formatSummary(text: string): string {
  return text.replace(
    /\[(\d+)\]/g,
    '<span class="inline-flex items-center justify-center w-5 h-5 mx-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full align-middle border border-emerald-500/30">$1</span>'
  );
}
