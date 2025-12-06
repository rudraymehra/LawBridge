'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  SearchBar,
  CategorySelector,
  ResultCard,
  LoadingState,
  ExampleQuestions,
} from '@/components';
import { trackSearch } from '@/components/GoogleAnalytics';
import { SearchResponse, LegalCategory } from '@/types';
import { Scale, Shield, BookOpen, Users, Sparkles, Zap, CheckCircle2, ArrowRight, FileText, Bot } from 'lucide-react';

export default function Home() {
  const [category, setCategory] = useState<LegalCategory>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((result || error) && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result, error]);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentQuestion(query);

    trackSearch(query, category);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: query,
          category: category !== 'all' ? category : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get a response. Please try again.');
      }

      const data: SearchResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  const handleNewSearch = () => {
    setResult(null);
    setError(null);
    setCurrentQuestion('');
  };

  const handleExampleSelect = (question: string) => {
    handleSearch(question);
  };

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="hero-dark grid-pattern relative py-20 md:py-32 overflow-hidden">
        {/* Decorative orbs */}
        <div className="orb orb-emerald w-[500px] h-[500px] -top-40 -right-40 animate-pulse-glow" />
        <div className="orb orb-cyan w-[400px] h-[400px] top-1/2 -left-40 animate-pulse-glow delay-300" />
        
        {/* Floating icons */}
        <div className="absolute top-20 right-[15%] animate-float opacity-20">
          <Scale className="w-16 h-16 text-emerald-400" />
        </div>
        <div className="absolute bottom-32 left-[10%] animate-float delay-200 opacity-15">
          <FileText className="w-12 h-12 text-cyan-400" />
        </div>
        <div className="absolute top-40 left-[20%] animate-float delay-500 opacity-10">
          <Shield className="w-10 h-10 text-amber-400" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fadeInUp">
            <div className="badge-emerald inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium">
              <Bot className="w-4 h-4" />
              <span>AI-Powered Legal Research</span>
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-fadeInUp tracking-tight">
              Legal Answers in
              <br />
              <span className="gradient-text-emerald">Plain English</span>
            </h1>
            <p className="text-lg md:text-xl text-[#a0a0b8] max-w-2xl mx-auto animate-fadeInUp delay-100 leading-relaxed">
              Ask any legal question and get clear, easy-to-understand answers
              backed by <span className="text-emerald-400">authoritative sources</span>. No law degree required.
            </p>
          </div>

          {/* Search Card */}
          <div className="glass-card-dark rounded-3xl p-6 md:p-8 space-y-6 animate-fadeInUp delay-200">
            <SearchBar
              onSearch={handleSearch}
              isLoading={isLoading}
            />

            {!result && !isLoading && !error && (
              <>
                <div className="divider my-6" />
                <CategorySelector
                  selected={category}
                  onSelect={setCategory}
                  disabled={isLoading}
                />

                <div className="divider my-6" />
                <ExampleQuestions
                  onSelect={handleExampleSelect}
                  disabled={isLoading}
                />
              </>
            )}
          </div>

          {/* Trust indicators */}
          {!result && !isLoading && !error && (
            <div className="flex flex-wrap justify-center gap-8 mt-10 animate-fadeInUp delay-300">
              <TrustBadge icon={<Zap className="w-4 h-4" />} text="Instant Answers" />
              <TrustBadge icon={<Shield className="w-4 h-4" />} text="Cited Sources" />
              <TrustBadge icon={<CheckCircle2 className="w-4 h-4" />} text="100% Free" />
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section ref={resultsRef} className="py-8 px-4 sm:px-6 lg:px-8 scroll-mt-20 bg-[#0a0a0f]">
        {isLoading && <LoadingState />}

        {(result || error) && (
          <ResultCard
            result={result}
            question={currentQuestion}
            error={error}
            onNewSearch={handleNewSearch}
          />
        )}
      </section>

      {/* Features Section */}
      {!result && !isLoading && !error && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 section-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="orb orb-emerald w-[300px] h-[300px] -bottom-20 -right-20 opacity-30" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="badge-emerald inline-flex px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Legal Information, <span className="gradient-text-emerald">Simplified</span>
              </h2>
              <p className="text-[#a0a0b8] max-w-2xl mx-auto text-lg">
                We make complex legal concepts accessible through cutting-edge AI technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<BookOpen className="w-6 h-6" />}
                title="Plain Language"
                description="Complex legal concepts explained in simple terms anyone can understand."
                color="emerald"
                delay={0}
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6" />}
                title="Cited Sources"
                description="Every answer backed by real legal documents and authoritative sources."
                color="cyan"
                delay={100}
              />
              <FeatureCard
                icon={<Scale className="w-6 h-6" />}
                title="AI-Powered"
                description="Advanced AI retrieves and synthesizes relevant legal information instantly."
                color="amber"
                delay={200}
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="For Everyone"
                description="Designed for everyday people, not lawyers. No legal background needed."
                color="purple"
                delay={300}
              />
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      {!result && !isLoading && !error && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="badge-amber inline-flex px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Three Simple Steps
              </h2>
              <p className="text-[#a0a0b8] max-w-2xl mx-auto text-lg">
                Get answers to your legal questions in seconds.
              </p>
            </div>

            <div className="space-y-6">
              <StepCard
                number={1}
                title="Ask Your Question"
                description="Type any legal question in plain English. No need to know legal terminology or complex phrases."
                icon={<Sparkles className="w-5 h-5" />}
              />
              <StepCard
                number={2}
                title="AI Searches Legal Sources"
                description="Our AI searches through authoritative legal databases to find the most relevant information."
                icon={<Zap className="w-5 h-5" />}
              />
              <StepCard
                number={3}
                title="Get Plain-Language Answer"
                description="Receive a clear, easy-to-understand summary with citations to original sources."
                icon={<CheckCircle2 className="w-5 h-5" />}
              />
            </div>

            <div className="text-center mt-16">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-2xl text-lg"
              >
                Ask Your First Question
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[#a0a0b8]">
      <div className="text-emerald-400">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'emerald' | 'cyan' | 'amber' | 'purple';
  delay: number;
}) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20',
    cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-500/20',
    amber: 'from-amber-500 to-amber-600 shadow-amber-500/20',
    purple: 'from-purple-500 to-purple-600 shadow-purple-500/20',
  };

  const glowClasses = {
    emerald: 'group-hover:bg-emerald-500/10',
    cyan: 'group-hover:bg-cyan-500/10',
    amber: 'group-hover:bg-amber-500/10',
    purple: 'group-hover:bg-purple-500/10',
  };

  return (
    <div
      className="feature-card group p-6 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 ${glowClasses[color]} rounded-[20px] transition-colors duration-300`} />
      
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[color]} text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-[#a0a0b8] text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group flex items-start gap-6 p-6 glass-card-dark rounded-2xl hover-lift">
      <div className="flex-shrink-0 relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
          {number}
        </div>
        {number < 3 && (
          <div className="absolute top-16 left-1/2 w-0.5 h-10 -translate-x-1/2 bg-gradient-to-b from-emerald-500/50 to-transparent" />
        )}
      </div>

      <div className="flex-1 pt-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <div className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>
        </div>
        <p className="text-[#a0a0b8] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
