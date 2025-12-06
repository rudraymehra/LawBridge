import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, Users, BookOpen, Shield, Target, Heart, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About LawBridge - Our Mission to Make Legal Information Accessible',
  description:
    'Learn about LawBridge, our mission to democratize access to legal information, and how we use AI to provide plain-language legal answers backed by authoritative sources.',
};

export default function AboutPage() {
  return (
    <div className="min-h-full bg-[#0a0a0f]">
      {/* Hero */}
      <section className="hero-dark grid-pattern py-20 md:py-28 relative overflow-hidden">
        <div className="orb orb-emerald w-[400px] h-[400px] -top-20 -right-20 opacity-30" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About <span className="gradient-text-emerald">LawBridge</span>
          </h1>
          <p className="text-xl text-[#a0a0b8] max-w-2xl mx-auto">
            Bridging the gap between complex legal information and everyday understanding.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Our Mission</h2>
          </div>
          <div className="space-y-6 text-[#a0a0b8] text-lg leading-relaxed">
            <p>
              The legal system can be overwhelming. Complex terminology, dense documents, and
              expensive professional consultations create barriers that prevent everyday people
              from understanding their rights and obligations.
            </p>
            <p>
              <strong className="text-white">LawBridge exists to change that.</strong> We believe that everyone deserves
              access to clear, understandable legal information. Our AI-powered platform translates
              complex legal concepts into plain English, making the law accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-dark relative">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
            How LawBridge Works
          </h2>

          <div className="space-y-6">
            <div className="glass-card-dark rounded-2xl p-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/20">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    You Ask a Question
                  </h3>
                  <p className="text-[#a0a0b8] leading-relaxed">
                    Type any legal question in your own words. No need to know legal terminology
                    or speak like a lawyer. Just ask naturally, like you would ask a knowledgeable
                    friend.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card-dark rounded-2xl p-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/20">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    AI Searches Authoritative Sources
                  </h3>
                  <p className="text-[#a0a0b8] leading-relaxed">
                    Our system uses Retrieval-Augmented Generation (RAG) to search through
                    authoritative legal databases and find the most relevant information for your
                    question. This ensures answers are grounded in real legal sources.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card-dark rounded-2xl p-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-amber-500/20">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    You Get a Plain-Language Answer
                  </h3>
                  <p className="text-[#a0a0b8] leading-relaxed">
                    Advanced AI synthesizes the information into a clear, easy-to-understand
                    response. Every answer includes citations to the original sources, so you
                    can verify and learn more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Plain Language"
              description="We follow the Plain Writing Act principles. Legal information should be clear enough for anyone to understand."
              color="emerald"
            />
            <ValueCard
              icon={<Shield className="w-6 h-6" />}
              title="Source Transparency"
              description="Every answer is backed by citations. We never ask you to trust us blindly - you can always verify."
              color="cyan"
            />
            <ValueCard
              icon={<Users className="w-6 h-6" />}
              title="Accessibility First"
              description="Designed for everyone, regardless of education level or legal background. No barriers to entry."
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <Scale className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-amber-300">Important Notice</h2>
            </div>
            <div className="space-y-4 text-amber-200/80 leading-relaxed">
              <p>
                LawBridge provides general legal information for educational purposes only. We are
                not a law firm, and our responses do not constitute legal advice, create an
                attorney-client relationship, or substitute for consultation with a qualified
                attorney.
              </p>
              <p>
                For specific legal matters, please consult with a licensed attorney in your
                jurisdiction who can evaluate your individual circumstances and provide
                personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-[#a0a0b8]">Built with care for everyday people</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Ready to Get Started?
          </h2>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl text-lg"
          >
            <Sparkles className="w-5 h-5" />
            Ask Your First Question
          </Link>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'emerald' | 'cyan' | 'amber';
}) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20 group-hover:bg-emerald-500/10',
    cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-500/20 group-hover:bg-cyan-500/10',
    amber: 'from-amber-500 to-amber-600 shadow-amber-500/20 group-hover:bg-amber-500/10',
  };

  return (
    <div className="group feature-card text-center p-6 transition-all duration-300">
      <div className={`absolute inset-0 ${colorClasses[color].split(' ').pop()} rounded-[20px] transition-colors duration-300`} />
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[color]} text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-[#a0a0b8] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
