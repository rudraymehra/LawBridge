'use client';

import { Scale, Search, FileText, Sparkles } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fadeIn">
      <div className="glass-card-dark rounded-3xl p-8 md:p-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Animated icon */}
          <div className="relative mb-8">
            {/* Outer ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-emerald-500/20 animate-ping opacity-40" />
            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />

            {/* Inner icon */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full opacity-20 animate-pulse" />
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-full shadow-lg shadow-emerald-500/30">
                <Scale className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Researching your question...
          </h3>
          <p className="text-[#6a6a80] mb-8">
            This usually takes just a few seconds
          </p>

          {/* Progress steps */}
          <div className="space-y-4 w-full max-w-sm">
            <LoadingStep
              icon={<Search className="w-4 h-4" />}
              text="Searching legal databases"
              delay={0}
              gradient="from-emerald-500 to-cyan-500"
            />
            <LoadingStep
              icon={<FileText className="w-4 h-4" />}
              text="Analyzing relevant documents"
              delay={800}
              gradient="from-cyan-500 to-blue-500"
            />
            <LoadingStep
              icon={<Sparkles className="w-4 h-4" />}
              text="Preparing plain-language summary"
              delay={1600}
              gradient="from-amber-500 to-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingStep({
  icon,
  text,
  delay,
  gradient,
}: {
  icon: React.ReactNode;
  text: string;
  delay: number;
  gradient: string;
}) {
  return (
    <div
      className="flex items-center gap-4 opacity-0 animate-fadeInUp"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[#a0a0b8] mb-1.5 text-left">{text}</p>
        <div className="h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
            style={{
              animation: `shimmer 2s ease-in-out infinite`,
              animationDelay: `${delay}ms`,
              width: '100%',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
